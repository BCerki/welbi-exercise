import { useState } from 'react'
import { Flex, Label, ActionButton, DevAuthContainer, Select } from '@testwelbi/ui'

const SAMPLE_USERS = [
  { id: 1, name: 'System Administrator' },
  { id: 2, name: 'John Doe' },
  { id: 3, name: 'Jane Smith' },
  { id: 4, name: 'Mike Wilson' },
  { id: 5, name: 'Sarah Johnson' },
  { id: 6, name: 'David Brown' },
  { id: 7, name: 'Lisa Davis' },
  { id: 8, name: 'Robert Miller' },
  { id: 9, name: 'Emily Garcia' },
  { id: 10, name: 'Thomas Martinez' },
  { id: 11, name: 'Jennifer Rodriguez' },
  { id: 12, name: 'James Lopez' },
  { id: 13, name: 'Mary Gonzalez' },
  { id: 14, name: 'William Anderson' },
  { id: 15, name: 'Patricia Taylor' },
  { id: 16, name: 'Charles Thomas' },
  { id: 17, name: 'Susan Jackson' },
  { id: 18, name: 'Joseph White' },
  { id: 19, name: 'Deborah Harris' },
  { id: 20, name: 'Christopher Clark' },
]

export function DevAuthWidget() {
  // Only show in development mode
  if (!import.meta.env.DEV) {
    return null
  }

  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const currentUserId = localStorage.getItem('dev-user-id')
  const currentUser = SAMPLE_USERS.find(u => u.id.toString() === currentUserId)

  const handleLogin = () => {
    if (selectedUserId) {
      localStorage.setItem('dev-user-id', selectedUserId)
      window.location.reload()
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('dev-user-id')
    window.location.reload()
  }

  return (
    <Flex $direction="row" $align="center" $gap="md">
      <DevAuthContainer>
        {currentUser ? (
          <>
            <Label $size="sm" $color="default">
              👤 {currentUser.name} (ID: {currentUser.id})
            </Label>
            <ActionButton 
              $size="small" 
              $variant="danger"
              onClick={handleLogout}
            >
              Logout
            </ActionButton>
          </>
        ) : (
          <>
            <Label $size="sm" $color="default">
              🔓 Not logged in
            </Label>
            <Select 
              $size="small"
              $minWidth="md"
              value={selectedUserId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select a user...</option>
              {SAMPLE_USERS.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} (ID: {user.id})
                </option>
              ))}
            </Select>
            <ActionButton 
              $size="small" 
              onClick={handleLogin}
              disabled={!selectedUserId}
            >
              Login
            </ActionButton>
          </>
        )}
      </DevAuthContainer>
    </Flex>
  )
}

