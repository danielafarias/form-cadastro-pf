import { useRef } from 'react'
import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  ThemeIcon,
  Badge,
} from '@mantine/core'
import {
  IconUser,
  IconHome,
  IconBriefcase,
  IconDownload,
  IconArrowLeft,
  IconCheck,
} from '@tabler/icons-react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { PrimaryButton, SecondaryButton } from '@/components/ui'
import type { FormData } from '@/features/form/types'
import classes from './Summary.module.css'

interface SummaryProps {
  data: FormData
  onBack: () => void
  onRestart: () => void
}

interface InfoItemProps {
  label: string
  value: string
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <Box>
      <Text size="xs" c="dimmed" fw={500} tt="uppercase" lts={0.5}>
        {label}
      </Text>
      <Text size="sm" fw={600} mt={2}>
        {value || '—'}
      </Text>
    </Box>
  )
}

export function Summary({ data, onBack, onRestart }: SummaryProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  async function exportToPdf() {
    if (!contentRef.current) return

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgRatio = canvas.height / canvas.width
      const imgWidth = pageWidth - 20
      const imgHeight = imgWidth * imgRatio

      let heightLeft = imgHeight
      let position = 10

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
      heightLeft -= pageHeight - 20

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
        heightLeft -= pageHeight - 20
      }

      const nomeFormatted = data.nomeCompleto
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

      pdf.save(`cadastro-${nomeFormatted}.pdf`)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
    }
  }

  return (
    <Stack gap="xl">
      <Box ref={contentRef} p="md" id="summary-content">
        <Group justify="center" mb="xl">
          <ThemeIcon
            size={56}
            radius="xl"
            variant="gradient"
            gradient={{ from: 'violet', to: 'blue', deg: 45 }}
          >
            <IconCheck size={28} />
          </ThemeIcon>
          <div>
            <Title order={2} c="violet.7">Cadastro Concluído!</Title>
            <Text c="dimmed" size="sm">Confira seus dados abaixo</Text>
          </div>
        </Group>

        <Stack gap="md">
          <Card withBorder radius="md" className={classes.sectionCard}>
            <Group gap="sm" mb="md">
              <ThemeIcon
                size={32}
                radius="md"
                variant="gradient"
                gradient={{ from: 'violet', to: 'blue', deg: 45 }}
              >
                <IconUser size={16} />
              </ThemeIcon>
              <Title order={4} c="violet.7">Dados Pessoais</Title>
            </Group>
            <Divider mb="md" color="violet.1" />
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <InfoItem label="Nome Completo" value={data.nomeCompleto} />
              <InfoItem label="Data de Nascimento" value={data.dataNascimento} />
              <InfoItem label="CPF" value={data.cpf} />
              <InfoItem label="Telefone" value={data.telefone} />
              <InfoItem label="E-mail" value={data.email} />
            </SimpleGrid>
          </Card>

          <Card withBorder radius="md" className={classes.sectionCard}>
            <Group gap="sm" mb="md">
              <ThemeIcon
                size={32}
                radius="md"
                variant="gradient"
                gradient={{ from: 'violet', to: 'blue', deg: 45 }}
              >
                <IconHome size={16} />
              </ThemeIcon>
              <Title order={4} c="violet.7">Informações Residenciais</Title>
            </Group>
            <Divider mb="md" color="violet.1" />
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <InfoItem label="CEP" value={data.cep} />
              <InfoItem label="Endereço" value={data.logradouro} />
              <InfoItem label="Bairro" value={data.bairro} />
              <InfoItem label="Cidade" value={data.cidade} />
              <InfoItem label="Estado" value={data.estado} />
            </SimpleGrid>
          </Card>

          <Card withBorder radius="md" className={classes.sectionCard}>
            <Group gap="sm" mb="md">
              <ThemeIcon
                size={32}
                radius="md"
                variant="gradient"
                gradient={{ from: 'violet', to: 'blue', deg: 45 }}
              >
                <IconBriefcase size={16} />
              </ThemeIcon>
              <Title order={4} c="violet.7">Informações Profissionais</Title>
            </Group>
            <Divider mb="md" color="violet.1" />
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <InfoItem label="Empresa" value={data.empresa} />
              <InfoItem label="Profissão" value={data.profissao} />
              <InfoItem label="Salário" value={data.salario} />
              <InfoItem label="Tempo de Empresa" value={
                data.tempoEmpresa === 'menos-1-ano' ? 'Menos de 1 ano' :
                data.tempoEmpresa === '1-2-anos' ? '1 a 2 anos' :
                data.tempoEmpresa === '2-5-anos' ? '2 a 5 anos' :
                data.tempoEmpresa === '5-10-anos' ? '5 a 10 anos' :
                data.tempoEmpresa === 'mais-10-anos' ? 'Mais de 10 anos' :
                data.tempoEmpresa
              } />
            </SimpleGrid>
          </Card>
        </Stack>

        <Group justify="center" mt="xl">
          <Badge
            variant="gradient"
            gradient={{ from: 'violet', to: 'blue', deg: 45 }}
            size="lg"
          >
            Dados preenchidos com sucesso
          </Badge>
        </Group>
      </Box>

      <Divider />

      <Group justify="space-between">
        <SecondaryButton
          onClick={onBack}
          leftSection={<IconArrowLeft size={16} />}
        >
          Editar Dados
        </SecondaryButton>
        <Group>
          <Button
            onClick={onRestart}
            variant="subtle"
            color="gray"
            size="md"
          >
            Novo Cadastro
          </Button>
          <PrimaryButton
            onClick={exportToPdf}
            leftSection={<IconDownload size={16} />}
          >
            Exportar PDF
          </PrimaryButton>
        </Group>
      </Group>
    </Stack>
  )
}
