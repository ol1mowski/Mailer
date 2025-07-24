import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useMailingLists } from '../useMailingLists.hook'
import { type MailingList } from '@/types'

describe('useMailingLists', () => {
  let result: any

  beforeEach(() => {
    const { result: hookResult } = renderHook(() => useMailingLists())
    result = hookResult
  })

  it('should initialize with mock mailing lists', () => {
    expect(result.current.mailingLists).toHaveLength(3)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('should add a new mailing list', () => {
    const newMailingList = {
      name: 'Test List',
      description: 'Test description',
      tags: ['test'],
    }

    act(() => {
      result.current.addMailingList(newMailingList)
    })

    expect(result.current.mailingLists).toHaveLength(4)
    expect(result.current.mailingLists[3].name).toBe('Test List')
    expect(result.current.mailingLists[3].description).toBe('Test description')
    expect(result.current.mailingLists[3].tags).toEqual(['test'])
    expect(result.current.mailingLists[3].contacts).toEqual([])
  })

  it('should update an existing mailing list', () => {
    const listId = result.current.mailingLists[0].id
    const updates = {
      name: 'Updated List Name',
      description: 'Updated description',
    }

    act(() => {
      result.current.updateMailingList(listId, updates)
    })

    const updatedList = result.current.mailingLists.find((list: MailingList) => list.id === listId)
    expect(updatedList.name).toBe('Updated List Name')
    expect(updatedList.description).toBe('Updated description')
  })

  it('should delete a mailing list', () => {
    const listId = result.current.mailingLists[0].id
    const initialLength = result.current.mailingLists.length

    act(() => {
      result.current.deleteMailingList(listId)
    })

    expect(result.current.mailingLists).toHaveLength(initialLength - 1)
    expect(result.current.mailingLists.find((list: MailingList) => list.id === listId)).toBeUndefined()
  })

  it('should get mailing list by id', () => {
    const listId = result.current.mailingLists[0].id

    const foundList = result.current.getMailingListById(listId)
    expect(foundList).toBeDefined()
    expect(foundList.id).toBe(listId)
  })

  it('should search mailing lists', () => {
    const searchResults = result.current.searchMailingLists('Newsletter')
    expect(searchResults.length).toBeGreaterThan(0)
    expect(searchResults.every((list: MailingList) => 
      list.name.toLowerCase().includes('newsletter') ||
      list.description?.toLowerCase().includes('newsletter') ||
      list.tags.some(tag => tag.toLowerCase().includes('newsletter'))
    )).toBe(true)
  })

  it('should get mailing lists by tag', () => {
    const tagResults = result.current.getMailingListsByTag('newsletter')
    expect(tagResults.every((list: MailingList) => 
      list.tags.includes('newsletter')
    )).toBe(true)
  })

  it('should add contact to mailing list', () => {
    const listId = result.current.mailingLists[0].id
    const contact = {
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      tags: [],
      isSubscribed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    act(() => {
      result.current.addContactToList(listId, contact)
    })

    const updatedList = result.current.mailingLists.find((list: MailingList) => list.id === listId)
    expect(updatedList.contacts).toHaveLength(1)
    expect(updatedList.contacts[0].email).toBe('test@example.com')
  })

  it('should remove contact from mailing list', () => {
    const listId = result.current.mailingLists[0].id
    const contact = {
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      tags: [],
      isSubscribed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // First add a contact
    act(() => {
      result.current.addContactToList(listId, contact)
    })

    // Then remove it
    act(() => {
      result.current.removeContactFromList(listId, contact.id)
    })

    const updatedList = result.current.mailingLists.find((list: MailingList) => list.id === listId)
    expect(updatedList.contacts).toHaveLength(0)
  })
}) 