import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { emailTemplateApi, type UpdateEmailTemplateRequest } from '@/lib/api'

export const useEmailTemplateMutations = () => {
  const queryClient = useQueryClient()

  const createTemplateMutation = useMutation({
    mutationFn: emailTemplateApi.createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] })
      toast.success('Szablon został utworzony pomyślnie!')
    },
    onError: (error) => {
      toast.error('Nie udało się utworzyć szablonu')
      console.error('Błąd tworzenia szablonu:', error)
    }
  })

  const updateTemplateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEmailTemplateRequest }) =>
      emailTemplateApi.updateTemplate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] })
      toast.success('Szablon został zaktualizowany pomyślnie!')
    },
    onError: (error) => {
      toast.error('Nie udało się zaktualizować szablonu')
      console.error('Błąd aktualizacji szablonu:', error)
    }
  })

  const deleteTemplateMutation = useMutation({
    mutationFn: emailTemplateApi.deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] })
      toast.success('Szablon został usunięty pomyślnie!')
    },
    onError: (error) => {
      toast.error('Nie udało się usunąć szablonu')
      console.error('Błąd usuwania szablonu:', error)
    }
  })

  const duplicateTemplateMutation = useMutation({
    mutationFn: emailTemplateApi.duplicateTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] })
      toast.success('Szablon został zduplikowany pomyślnie!')
    },
    onError: (error) => {
      toast.error('Nie udało się zduplikować szablonu')
      console.error('Błąd duplikowania szablonu:', error)
    }
  })

  const toggleStatusMutation = useMutation({
    mutationFn: emailTemplateApi.toggleTemplateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] })
      toast.success('Status szablonu został zmieniony pomyślnie!')
    },
    onError: (error) => {
      toast.error('Nie udało się zmienić statusu szablonu')
      console.error('Błąd zmiany statusu szablonu:', error)
    }
  })

  return {
    createTemplateMutation,
    updateTemplateMutation,
    deleteTemplateMutation,
    duplicateTemplateMutation,
    toggleStatusMutation
  }
}