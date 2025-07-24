import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MailingListCard } from '../MailingListCard.component'
import { type MailingList } from '@/types'

const mockMailingList: MailingList = {
  id: '1',
  name: 'Test List',
  description: 'Test description',
  contacts: [],
  tags: ['test', 'demo'],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

const mockHandlers = {
  onEdit: vi.fn(),
  onDelete: vi.fn(),
  onSendEmail: vi.fn(),
}

describe('MailingListCard', () => {
  it('renders mailing list information correctly', () => {
    render(
      <MailingListCard
        mailingList={mockMailingList}
        {...mockHandlers}
      />
    )

    expect(screen.getByText('Test List')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('0 kontaktów')).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByText('demo')).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', () => {
    render(
      <MailingListCard
        mailingList={mockMailingList}
        {...mockHandlers}
      />
    )

    const editButton = screen.getByText('Edytuj')
    fireEvent.click(editButton)

    expect(mockHandlers.onEdit).toHaveBeenCalledWith('1')
  })

  it('calls onDelete when delete button is clicked', () => {
    render(
      <MailingListCard
        mailingList={mockMailingList}
        {...mockHandlers}
      />
    )

    const deleteButton = screen.getByRole('button', { name: '' })
    fireEvent.click(deleteButton)

    expect(mockHandlers.onDelete).toHaveBeenCalledWith('1')
  })

  it('calls onSendEmail when send button is clicked', () => {
    render(
      <MailingListCard
        mailingList={mockMailingList}
        {...mockHandlers}
      />
    )

    const sendButton = screen.getByText('Wyślij')
    fireEvent.click(sendButton)

    expect(mockHandlers.onSendEmail).toHaveBeenCalledWith('1')
  })

  it('displays correct number of contacts', () => {
    const mailingListWithContacts = {
      ...mockMailingList,
      contacts: [
        { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', tags: [], isSubscribed: true, createdAt: new Date(), updatedAt: new Date() }
      ]
    }

    render(
      <MailingListCard
        mailingList={mailingListWithContacts}
        {...mockHandlers}
      />
    )

    expect(screen.getByText('1 kontaktów')).toBeInTheDocument()
  })

  it('renders without description when not provided', () => {
    const mailingListWithoutDescription = {
      ...mockMailingList,
      description: undefined
    }

    render(
      <MailingListCard
        mailingList={mailingListWithoutDescription}
        {...mockHandlers}
      />
    )

    expect(screen.queryByText('Test description')).not.toBeInTheDocument()
  })
}) 