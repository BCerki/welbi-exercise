import React from 'react';
import { styled, v } from './boomer' with { type: 'macro' };
import { Grid, GridItem, Typography, Box, Card } from './components';

// Calendar-specific styled components
const CalendarContainer = styled('div', {
  base: {
    border: `${v('borders.thin')} ${v('colors.border')}`,
    borderRadius: v('radii.sm'),
    overflow: 'hidden',
  },
}, {
  name: 'CalendarContainer',
});

const CalendarHeader = styled('div', {
  base: {
    backgroundColor: v('colors.surfacePrimary'),
    padding: v('sizes.spacing4'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}, {
  name: 'CalendarHeader',
});

const CalendarNavButton = styled('button', {
  base: {
    backgroundColor: 'transparent',
    border: 'none',
    color: v('colors.text'),
    cursor: 'pointer',
    padding: v('sizes.spacing2'),
    borderRadius: v('radii.sm'),
    fontSize: v('fontSizes.lg'),
    fontWeight: v('fontWeights.bold'),
    '&:hover': {
      backgroundColor: v('colors.surfacePrimary'),
    },
  },
}, {
  name: 'CalendarNavButton',
});

const DayHeader = styled('div', {
  base: {
    backgroundColor: v('colors.surfacePrimary'),
    padding: v('sizes.spacing2'),
    textAlign: 'center',
    fontSize: v('fontSizes.sm'),
    fontWeight: v('fontWeights.bold'),
    color: v('colors.text'),
    borderBottom: `${v('borders.thin')} ${v('colors.border')}`,
    borderRight: `${v('borders.thin')} ${v('colors.border')}`,
    '&:last-child': {
      borderRight: 'none',
    },
  },
}, {
  name: 'DayHeader',
});

const CalendarDay = styled('div', {
  base: {
    minHeight: v('sizes.calendarDayHeight'),
    padding: v('sizes.spacing2'),
    borderBottom: `${v('borders.thin')} ${v('colors.border')}`,
    borderRight: `${v('borders.thin')} ${v('colors.border')}`,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: v('colors.white'),
    overflow: 'hidden',
    '&:last-child': {
      borderRight: 'none',
    },
    '&:nth-last-child(-n+7)': {
      borderBottom: 'none',
    },
  },
  variants: {
    isCurrentMonth: {
      true: {
        backgroundColor: v('colors.white'),
        color: v('colors.text'),
      },
      false: {
        backgroundColor: v('colors.surfacePrimary'),
        color: v('colors.secondary'),
      },
    },
    isToday: {
      true: {
        backgroundColor: v('colors.surfacePrimary'),
        border: `2px solid ${v('colors.primary')}`,
        '& > div:first-child': {
          color: v('colors.primary'),
          fontWeight: v('fontWeights.bold'),
        },
      },
    },
    hasEvents: {
      true: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: v('colors.surfacePrimary'),
        },
      },
    },
  },
}, {
  name: 'CalendarDay',
});

const DayNumber = styled('div', {
  base: {
    fontSize: v('fontSizes.sm'),
    marginBottom: v('sizes.spacing1'),
    fontWeight: v('fontWeights.bold'),
  },
}, {
  name: 'DayNumber',
});

const EventDot = styled('div', {
  base: {
    width: v('sizes.eventDotSize'),
    height: v('sizes.eventDotSize'),
    borderRadius: '50%',
    backgroundColor: v('colors.primary'),
    marginBottom: v('sizes.spacingXxs'),
  },
}, {
  name: 'EventDot',
});

const EventPreview = styled('div', {
  base: {
    fontSize: v('fontSizes.xxs'),
    backgroundColor: v('colors.primary'),
    color: v('colors.white'),
    padding: `${v('sizes.spacingXs')} ${v('sizes.spacing2')}`,
    borderRadius: v('radii.xs'),
    marginBottom: v('sizes.spacingXxs'),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    lineHeight: '1.2',
    '&:hover': {
      opacity: 0.8,
      transform: 'scale(1.02)',
    },
  },
  variants: {
    status: {
      scheduled: {
        backgroundColor: v('colors.primary'),
      },
      cancelled: {
        backgroundColor: v('colors.error'),
      },
      completed: {
        backgroundColor: v('colors.success'),
      },
    },
  },
}, {
  name: 'EventPreview',
});

// Types
export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'cancelled' | 'completed';
  description?: string;
  currentParticipants?: number;
  maxParticipants?: number;
}

export interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onMonthChange?: (year: number, month: number) => void;
  onNavigateMonth?: (direction: 'prev' | 'next', currentYear: number, currentMonth: number) => void;
  initialDate?: Date;
}

// Calendar component
export const Calendar: React.FC<CalendarProps> = ({
  events = [],
  onDateClick,
  onEventClick,
  onMonthChange,
  onNavigateMonth,
  initialDate = new Date(),
}) => {
  const [currentDate, setCurrentDate] = React.useState(initialDate);
  
  // Update currentDate when initialDate changes (for controlled behavior)
  React.useEffect(() => {
    setCurrentDate(initialDate);
  }, [initialDate]);
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  const today = new Date();
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };
  
  const isSameMonth = (date: Date) => {
    return date.getMonth() === month && date.getFullYear() === year;
  };
  
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    // If consumer provides onNavigateMonth, use that instead of internal navigation
    if (onNavigateMonth) {
      onNavigateMonth(direction, year, month);
      return;
    }
    
    // Otherwise, use internal navigation (backward compatibility)
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(month - 1);
    } else {
      newDate.setMonth(month + 1);
    }
    setCurrentDate(newDate);
    onMonthChange?.(newDate.getFullYear(), newDate.getMonth());
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate calendar days
  const calendarDays = [];
  
  // Add days from previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    calendarDays.push({
      date,
      isCurrentMonth: false,
      events: getEventsForDate(date),
    });
  }
  
  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    calendarDays.push({
      date,
      isCurrentMonth: true,
      events: getEventsForDate(date),
    });
  }
  
  // Add days from next month to fill the grid
  const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    calendarDays.push({
      date,
      isCurrentMonth: false,
      events: getEventsForDate(date),
    });
  }
  
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarNavButton onClick={() => navigateMonth('prev')}>
          ‹
        </CalendarNavButton>
        <Typography $variant="h6">
          {monthNames[month]} {year}
        </Typography>
        <CalendarNavButton onClick={() => navigateMonth('next')}>
          ›
        </CalendarNavButton>
      </CalendarHeader>
      
      <Grid $columns={7} $gap={0}>
        {dayNames.map(day => (
          <DayHeader key={day}>
            {day}
          </DayHeader>
        ))}
        
        {calendarDays.map(({ date, isCurrentMonth, events: dayEvents }, index) => (
          <CalendarDay
            key={index}
            $isCurrentMonth={isCurrentMonth}
            $isToday={isToday(date)}
            $hasEvents={dayEvents.length > 0}
            onClick={() => onDateClick?.(date)}
          >
            <DayNumber>
              {date.getDate()}
            </DayNumber>
            
            {dayEvents.slice(0, 5).map(event => (
              <EventPreview
                key={event.id}
                $status={event.status}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick?.(event);
                }}
                title={`${event.title} - ${new Date(event.startTime).toLocaleTimeString()}`}
              >
                {event.title}
              </EventPreview>
            ))}
            
            {dayEvents.length > 5 && (
              <Typography $variant="body2" style={{ fontSize: v('fontSizes.xxs'), color: v('colors.textMuted'), fontWeight: v('fontWeights.bold') }}>
                +{dayEvents.length - 5} more
              </Typography>
            )}
          </CalendarDay>
        ))}
      </Grid>
    </CalendarContainer>
  );
}; 