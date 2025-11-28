import { db } from '@testwelbi/drizzle/src/db';
import * as schema from '@testwelbi/drizzle';

// Sample data generators
const sampleUsers = [
  { email: 'admin@testwelbi.com', name: 'System Administrator' },
  { email: 'john.doe@testwelbi.com', name: 'John Doe' },
  { email: 'jane.smith@testwelbi.com', name: 'Jane Smith' },
  { email: 'mike.wilson@testwelbi.com', name: 'Mike Wilson' },
  { email: 'sarah.johnson@testwelbi.com', name: 'Sarah Johnson' },
  { email: 'david.brown@testwelbi.com', name: 'David Brown' },
  { email: 'lisa.davis@testwelbi.com', name: 'Lisa Davis' },
  { email: 'robert.miller@testwelbi.com', name: 'Robert Miller' },
  { email: 'emily.garcia@testwelbi.com', name: 'Emily Garcia' },
  { email: 'thomas.martinez@testwelbi.com', name: 'Thomas Martinez' },
  { email: 'jennifer.rodriguez@testwelbi.com', name: 'Jennifer Rodriguez' },
  { email: 'james.lopez@testwelbi.com', name: 'James Lopez' },
  { email: 'mary.gonzalez@testwelbi.com', name: 'Mary Gonzalez' },
  { email: 'william.anderson@testwelbi.com', name: 'William Anderson' },
  { email: 'patricia.taylor@testwelbi.com', name: 'Patricia Taylor' },
  { email: 'charles.thomas@testwelbi.com', name: 'Charles Thomas' },
  { email: 'susan.jackson@testwelbi.com', name: 'Susan Jackson' },
  { email: 'joseph.white@testwelbi.com', name: 'Joseph White' },
  { email: 'deborah.harris@testwelbi.com', name: 'Deborah Harris' },
  { email: 'christopher.clark@testwelbi.com', name: 'Christopher Clark' }
];

const sampleRoles = [
  { name: 'admin', description: 'System Administrator with full access' },
  { name: 'facilitator', description: 'Activity facilitator and coordinator' },
  { name: 'resident', description: 'Wellness program participant' },
  { name: 'manager', description: 'Program manager and supervisor' },
  { name: 'coordinator', description: 'Event and activity coordinator' },
  { name: 'therapist', description: 'Licensed therapist and counselor' },
  { name: 'nurse', description: 'Registered nurse and healthcare provider' },
  { name: 'volunteer', description: 'Community volunteer' }
];

const samplePermissions = [
  { name: 'read_users', resource: 'users', action: 'read' },
  { name: 'write_users', resource: 'users', action: 'write' },
  { name: 'delete_users', resource: 'users', action: 'delete' },
  { name: 'read_events', resource: 'events', action: 'read' },
  { name: 'write_events', resource: 'events', action: 'write' },
  { name: 'delete_events', resource: 'events', action: 'delete' },
  { name: 'read_reports', resource: 'reports', action: 'read' },
  { name: 'write_reports', resource: 'reports', action: 'write' },
  { name: 'manage_facilities', resource: 'facilities', action: 'manage' },
  { name: 'manage_staff', resource: 'staff', action: 'manage' }
];

const sampleWellnessDimensions = [
  { name: 'Physical Wellness', description: 'Activities focusing on physical health and fitness', color: '#FF6B6B' },
  { name: 'Mental Wellness', description: 'Activities supporting cognitive and mental health', color: '#4ECDC4' },
  { name: 'Social Wellness', description: 'Activities promoting social connections and community', color: '#45B7D1' },
  { name: 'Emotional Wellness', description: 'Activities supporting emotional regulation and expression', color: '#96CEB4' },
  { name: 'Spiritual Wellness', description: 'Activities exploring meaning, purpose, and values', color: '#FFEAA7' },
  { name: 'Intellectual Wellness', description: 'Activities stimulating learning and creativity', color: '#DDA0DD' },
  { name: 'Environmental Wellness', description: 'Activities connecting with nature and surroundings', color: '#98D8C8' },
  { name: 'Occupational Wellness', description: 'Activities related to purpose and meaningful work', color: '#F7DC6F' }
];

const sampleHobbies = [
  { name: 'Painting', description: 'Creative expression through visual arts', category: 'arts' },
  { name: 'Gardening', description: 'Growing plants and tending to gardens', category: 'nature' },
  { name: 'Chess', description: 'Strategic board game', category: 'games' },
  { name: 'Knitting', description: 'Creating textiles with yarn', category: 'crafts' },
  { name: 'Photography', description: 'Capturing moments through images', category: 'arts' },
  { name: 'Dancing', description: 'Movement and rhythm expression', category: 'physical' },
  { name: 'Reading', description: 'Enjoying books and literature', category: 'intellectual' },
  { name: 'Cooking', description: 'Preparing and creating meals', category: 'life_skills' },
  { name: 'Music', description: 'Playing instruments or singing', category: 'arts' },
  { name: 'Yoga', description: 'Mind-body practice combining movement and meditation', category: 'physical' },
  { name: 'Birdwatching', description: 'Observing and identifying birds', category: 'nature' },
  { name: 'Puzzles', description: 'Solving jigsaw puzzles and brain teasers', category: 'games' },
  { name: 'Woodworking', description: 'Creating objects from wood', category: 'crafts' },
  { name: 'Storytelling', description: 'Sharing personal stories and experiences', category: 'social' },
  { name: 'Walking', description: 'Gentle exercise and exploration', category: 'physical' }
];

const sampleTags = [
  { name: 'Low Impact', color: '#A8E6CF' },
  { name: 'High Energy', color: '#FFB3BA' },
  { name: 'Group Activity', color: '#B5EAD7' },
  { name: 'Individual', color: '#C7CEEA' },
  { name: 'Outdoor', color: '#FFDAC1' },
  { name: 'Indoor', color: '#E2F0CB' },
  { name: 'Seated', color: '#F8D7DA' },
  { name: 'Standing', color: '#D4EDDA' },
  { name: 'Creative', color: '#FFF3CD' },
  { name: 'Educational', color: '#D1ECF1' },
  { name: 'Therapeutic', color: '#F4CCCC' },
  { name: 'Social', color: '#FCE4EC' },
  { name: 'Mindful', color: '#E8F5E8' },
  { name: 'Adaptive', color: '#E3F2FD' },
  { name: 'Seasonal', color: '#FFF8E1' }
];

const sampleLocations = [
  { 
    name: 'Main Activity Room', 
    description: 'Large multipurpose room for group activities',
    type: 'room',
    capacity: 40,
    equipment: ['projector', 'sound_system', 'chairs', 'tables'],
    accessibility: ['wheelchair_accessible', 'hearing_loop', 'good_lighting']
  },
  {
    name: 'Art Studio',
    description: 'Creative space with art supplies and natural light',
    type: 'room',
    capacity: 15,
    equipment: ['easels', 'art_supplies', 'sink', 'storage'],
    accessibility: ['wheelchair_accessible', 'adjustable_tables', 'good_lighting']
  },
  {
    name: 'Fitness Center',
    description: 'Exercise equipment and workout space',
    type: 'gym',
    capacity: 20,
    equipment: ['treadmills', 'exercise_bikes', 'weights', 'yoga_mats'],
    accessibility: ['wheelchair_accessible', 'adapted_equipment', 'safety_rails']
  },
  {
    name: 'Garden Patio',
    description: 'Outdoor space with garden beds and seating',
    type: 'outdoor',
    capacity: 25,
    equipment: ['garden_tools', 'planters', 'benches', 'shade_structures'],
    accessibility: ['paved_paths', 'raised_beds', 'covered_seating']
  },
  {
    name: 'Library Corner',
    description: 'Quiet reading and discussion space',
    type: 'room',
    capacity: 12,
    equipment: ['bookshelves', 'comfortable_seating', 'reading_lamps'],
    accessibility: ['wheelchair_accessible', 'large_print_books', 'quiet_space']
  },
  {
    name: 'Music Room',
    description: 'Space for musical activities and performances',
    type: 'room',
    capacity: 30,
    equipment: ['piano', 'sound_system', 'microphones', 'instruments'],
    accessibility: ['wheelchair_accessible', 'acoustic_design', 'hearing_loop']
  }
];

const sampleLevelsOfCare = [
  {
    name: 'Independent Living',
    description: 'Residents who live independently with minimal support',
    level: 1,
    requirements: ['basic_mobility', 'cognitive_awareness', 'self_care_ability']
  },
  {
    name: 'Assisted Living',
    description: 'Residents requiring some assistance with daily activities',
    level: 2,
    requirements: ['some_mobility_support', 'medication_management', 'meal_assistance']
  },
  {
    name: 'Memory Care',
    description: 'Specialized care for residents with cognitive impairments',
    level: 3,
    requirements: ['cognitive_support', 'safety_supervision', 'specialized_programming']
  },
  {
    name: 'Skilled Nursing',
    description: 'Medical care and 24-hour nursing supervision',
    level: 4,
    requirements: ['medical_supervision', 'nursing_care', 'therapy_services']
  }
];

const sampleFacilitators = [
  {
    employeeId: 'EMP001',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@facility.com',
    phone: '555-0101',
    department: 'Activities',
    position: 'Senior Activity Director',
    specialties: ['group_facilitation', 'arts_therapy', 'program_development']
  },
  {
    employeeId: 'EMP002',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@facility.com',
    phone: '555-0102',
    department: 'Wellness',
    position: 'Fitness Coordinator',
    specialties: ['physical_therapy', 'adaptive_exercise', 'fall_prevention']
  },
  {
    employeeId: 'EMP003',
    firstName: 'Carol',
    lastName: 'Davis',
    email: 'carol.davis@facility.com',
    phone: '555-0103',
    department: 'Activities',
    position: 'Music Therapist',
    specialties: ['music_therapy', 'dementia_care', 'sensory_stimulation']
  },
  {
    employeeId: 'EMP004',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@facility.com',
    phone: '555-0104',
    department: 'Therapeutic Services',
    position: 'Occupational Therapist',
    specialties: ['occupational_therapy', 'adaptive_equipment', 'cognitive_rehabilitation']
  },
  {
    employeeId: 'EMP005',
    firstName: 'Eva',
    lastName: 'Martinez',
    email: 'eva.martinez@facility.com',
    phone: '555-0105',
    department: 'Activities',
    position: 'Horticultural Therapist',
    specialties: ['garden_therapy', 'nature_programs', 'sensory_gardens']
  }
];

export const seed = async () => {
  console.log('🌱 Starting comprehensive database seeding...');

  try {
    // Clear existing data (in reverse order due to foreign key constraints) - skip if tables don't exist
    console.log('🧹 Clearing existing data...');
    try {
      await db.delete(schema.eventParticipants);
      await db.delete(schema.eventFacilitators);
      await db.delete(schema.eventLevelsOfCare);
      await db.delete(schema.eventTags);
      await db.delete(schema.eventHobbies);
      await db.delete(schema.events);
      await db.delete(schema.recurrencePatterns);
      await db.delete(schema.eventSeries);
      await db.delete(schema.facilitators);
      await db.delete(schema.locations);
      await db.delete(schema.levelsOfCare);
      await db.delete(schema.tags);
      await db.delete(schema.hobbies);
      await db.delete(schema.wellnessDimensions);
      await db.delete(schema.permissions);
      await db.delete(schema.roles);
      await db.delete(schema.users);
    } catch (clearError) {
      console.log('⚠️ Warning: Some tables may not exist yet, continuing with seeding...');
    }

    // Seed users
    console.log('👥 Seeding users...');
    const insertedUsers = await db.insert(schema.users).values(sampleUsers).returning();
    console.log(`✅ Inserted ${insertedUsers.length} users`);

    // Seed roles
    console.log('🛡️ Seeding roles...');
    const insertedRoles = await db.insert(schema.roles).values(sampleRoles).returning();
    console.log(`✅ Inserted ${insertedRoles.length} roles`);

    // Seed permissions
    console.log('🔐 Seeding permissions...');
    const insertedPermissions = await db.insert(schema.permissions).values(samplePermissions).returning();
    console.log(`✅ Inserted ${insertedPermissions.length} permissions`);

    // Seed wellness dimensions
    console.log('🌈 Seeding wellness dimensions...');
    const insertedWellnessDimensions = await db.insert(schema.wellnessDimensions).values(sampleWellnessDimensions).returning();
    console.log(`✅ Inserted ${insertedWellnessDimensions.length} wellness dimensions`);

    // Seed hobbies
    console.log('🎨 Seeding hobbies...');
    const insertedHobbies = await db.insert(schema.hobbies).values(sampleHobbies).returning();
    console.log(`✅ Inserted ${insertedHobbies.length} hobbies`);

    // Seed tags
    console.log('🏷️ Seeding tags...');
    const insertedTags = await db.insert(schema.tags).values(sampleTags).returning();
    console.log(`✅ Inserted ${insertedTags.length} tags`);

    // Seed levels of care
    console.log('🏥 Seeding levels of care...');
    const insertedLevelsOfCare = await db.insert(schema.levelsOfCare).values(sampleLevelsOfCare).returning();
    console.log(`✅ Inserted ${insertedLevelsOfCare.length} levels of care`);

    // Seed locations
    console.log('📍 Seeding locations...');
    const insertedLocations = await db.insert(schema.locations).values(sampleLocations).returning();
    console.log(`✅ Inserted ${insertedLocations.length} locations`);

    // Seed facilitators (link to users)
    console.log('👨‍🏫 Seeding facilitators...');
    const facilitatorsWithUsers = sampleFacilitators.map((facilitator, index) => ({
      ...facilitator,
      userId: insertedUsers[index + 1]?.id || insertedUsers[0].id, // Skip admin user
      hireDate: Date.now() / 1000 - (Math.random() * 365 * 24 * 60 * 60) // Random hire date within last year
    }));
    const insertedFacilitators = await db.insert(schema.facilitators).values(facilitatorsWithUsers).returning();
    console.log(`✅ Inserted ${insertedFacilitators.length} facilitators`);

    // Seed event series
    console.log('📚 Seeding event series...');
    const sampleEventSeries = [
      { name: 'Morning Wellness', description: 'Daily morning wellness activities' },
      { name: 'Creative Arts', description: 'Weekly creative arts workshops' },
      { name: 'Fitness Classes', description: 'Regular fitness and movement classes' },
      { name: 'Social Hours', description: 'Community social gathering times' },
      { name: 'Educational Workshops', description: 'Learning and skill development sessions' },
      { name: 'Therapeutic Programs', description: 'Specialized therapeutic interventions' }
    ];
    const insertedEventSeries = await db.insert(schema.eventSeries).values(sampleEventSeries).returning();
    console.log(`✅ Inserted ${insertedEventSeries.length} event series`);

    // Seed recurrence patterns
    console.log('🔄 Seeding recurrence patterns...');
    const sampleRecurrencePatterns = [
      { type: 'daily', interval: 1, daysOfWeek: [1, 2, 3, 4, 5] }, // Weekdays
      { type: 'weekly', interval: 1, daysOfWeek: [2, 4] }, // Tuesday and Thursday
      { type: 'weekly', interval: 1, daysOfWeek: [1, 3, 5] }, // Monday, Wednesday, Friday
      { type: 'weekly', interval: 2, daysOfWeek: [6] }, // Every other Saturday
      { type: 'monthly', interval: 1, dayOfMonth: 15 }, // 15th of each month
      { type: 'weekly', interval: 1, daysOfWeek: [0] } // Every Sunday
    ];
    const insertedRecurrencePatterns = await db.insert(schema.recurrencePatterns).values(sampleRecurrencePatterns).returning();
    console.log(`✅ Inserted ${insertedRecurrencePatterns.length} recurrence patterns`);

    // Generate lots of events from 2024 to 2026 with AEST timezone
    console.log('📅 Seeding events (2024-2026)...');
    const sampleEvents = [];
    const eventTitles = [
      'Morning Yoga', 'Art Therapy', 'Garden Club', 'Music Appreciation', 'Chair Exercises',
      'Book Club', 'Cooking Class', 'Dance Movement', 'Memory Games', 'Craft Workshop',
      'Nature Walk', 'Meditation Session', 'Social Hour', 'Educational Lecture', 'Game Tournament',
      'Singing Circle', 'Photography Club', 'Wellness Check-in', 'Storytelling Time', 'Fitness Class',
      'Creative Writing', 'Bingo Night', 'Movie Screening', 'Cultural Celebration', 'Volunteer Project',
      'Brain Training', 'Relaxation Workshop', 'Community Meeting', 'Health Seminar', 'Hobby Group',
      'Tai Chi', 'Pottery Class', 'Chess Club', 'Aqua Aerobics', 'Painting Workshop',
      'Trivia Night', 'Gentle Stretching', 'Scrapbooking', 'Karaoke', 'Flower Arranging',
      'Computer Basics', 'Tea Time', 'Board Games', 'Arm Chair Travel', 'Reminiscence Therapy',
      'Walking Group', 'Drumming Circle', 'Cooking Demo', 'Pet Therapy', 'Jewelry Making'
    ];

    // AEST is UTC+10, so we need to offset times accordingly
    const AEST_OFFSET = 10 * 60 * 60; // 10 hours in seconds
    
    // Generate events from Jan 1, 2024 to Dec 31, 2026
    const startDate = new Date('2024-01-01T00:00:00Z');
    const endDate = new Date('2026-12-31T23:59:59Z');
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    
    // Generate approximately 2000+ events over the 3-year period
    const totalEvents = 2500;
    console.log(`Generating ${totalEvents} events from 2024 to 2026...`);

    for (let i = 0; i < totalEvents; i++) {
      const randomTitle = eventTitles[Math.floor(Math.random() * eventTitles.length)];
      
      // Generate random date within the range
      const randomDay = Math.floor(Math.random() * totalDays);
      const eventDate = new Date(startDate.getTime() + randomDay * 24 * 60 * 60 * 1000);
      
      // Set random time (8 AM to 6 PM AEST)
      const randomHour = 8 + Math.floor(Math.random() * 11); // 8-18 (6 PM)
      const randomMinute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
      
      eventDate.setUTCHours(randomHour - 10, randomMinute, 0, 0); // Adjust for AEST (UTC+10)
      
      const startTime = Math.floor(eventDate.getTime() / 1000);
      const duration = 30 + Math.random() * 120; // 30-150 minutes
      const endTime = startTime + (duration * 60);

      sampleEvents.push({
        title: `${randomTitle} ${i + 1}`,
        description: `Join us for an engaging ${randomTitle.toLowerCase()} session designed to promote wellness and community connection. This activity is suitable for various fitness levels and encourages social interaction.`,
        startTime,
        endTime,
        duration: Math.floor(duration),
        wellnessDimensionId: insertedWellnessDimensions[Math.floor(Math.random() * insertedWellnessDimensions.length)].id,
        locationId: insertedLocations[Math.floor(Math.random() * insertedLocations.length)].id,
        seriesId: Math.random() > 0.6 ? insertedEventSeries[Math.floor(Math.random() * insertedEventSeries.length)].id : null,
        recurrencePatternId: Math.random() > 0.8 ? insertedRecurrencePatterns[Math.floor(Math.random() * insertedRecurrencePatterns.length)].id : null,
        maxParticipants: 5 + Math.floor(Math.random() * 35), // 5-40 participants
        registrationRequired: Math.random() > 0.3, // 70% require registration
        registrationDeadline: Math.random() > 0.4 ? startTime - (2 * 60 * 60) : null, // 2 hours before
        status: 'scheduled',
        createdBy: insertedUsers[Math.floor(Math.random() * insertedUsers.length)].id
      });
    }

    // Sort events by start time for better organization
    sampleEvents.sort((a, b) => a.startTime - b.startTime);

    const insertedEvents = await db.insert(schema.events).values(sampleEvents).returning();
    console.log(`✅ Inserted ${insertedEvents.length} events`);

    // Create event relationships
    console.log('🔗 Creating event relationships...');

    // Event-Hobby relationships
    const eventHobbiesData: { eventId: number; hobbyId: number }[] = [];
    insertedEvents.forEach(event => {
      // 40% chance of having hobbies
      if (Math.random() < 0.4) {
        const numHobbies = 1 + Math.floor(Math.random() * 3); // 1-3 hobbies
        const selectedHobbies: number[] = [];
        for (let i = 0; i < numHobbies; i++) {
          const hobby = insertedHobbies[Math.floor(Math.random() * insertedHobbies.length)];
          if (!selectedHobbies.includes(hobby.id)) {
            selectedHobbies.push(hobby.id);
            eventHobbiesData.push({
              eventId: event.id,
              hobbyId: hobby.id
            });
          }
        }
      }
    });
    if (eventHobbiesData.length > 0) {
      await db.insert(schema.eventHobbies).values(eventHobbiesData);
      console.log(`✅ Created ${eventHobbiesData.length} event-hobby relationships`);
    }

    // Event-Tag relationships
    const eventTagsData: { eventId: number; tagId: number }[] = [];
    insertedEvents.forEach(event => {
      // Each event gets 1-4 tags
      const numTags = 1 + Math.floor(Math.random() * 4);
      const selectedTags: number[] = [];
      for (let i = 0; i < numTags; i++) {
        const tag = insertedTags[Math.floor(Math.random() * insertedTags.length)];
        if (!selectedTags.includes(tag.id)) {
          selectedTags.push(tag.id);
          eventTagsData.push({
            eventId: event.id,
            tagId: tag.id
          });
        }
      }
    });
    await db.insert(schema.eventTags).values(eventTagsData);
    console.log(`✅ Created ${eventTagsData.length} event-tag relationships`);

    // Event-LevelOfCare relationships
    const eventLevelsOfCareData: { eventId: number; levelOfCareId: number }[] = [];
    insertedEvents.forEach(event => {
      // 75% of events have level of care requirements
      if (Math.random() < 0.75) {
        const numLevels = 1 + Math.floor(Math.random() * 2); // 1-2 levels
        const selectedLevels: number[] = [];
        for (let i = 0; i < numLevels; i++) {
          const level = insertedLevelsOfCare[Math.floor(Math.random() * insertedLevelsOfCare.length)];
          if (!selectedLevels.includes(level.id)) {
            selectedLevels.push(level.id);
            eventLevelsOfCareData.push({
              eventId: event.id,
              levelOfCareId: level.id
            });
          }
        }
      }
    });
    if (eventLevelsOfCareData.length > 0) {
      await db.insert(schema.eventLevelsOfCare).values(eventLevelsOfCareData);
      console.log(`✅ Created ${eventLevelsOfCareData.length} event-level-of-care relationships`);
    }

    // Event-Facilitator relationships
    const eventFacilitatorsData: { eventId: number; facilitatorId: number; role: string }[] = [];
    insertedEvents.forEach(event => {
      // Each event has 1-2 facilitators
      const numFacilitators = 1 + Math.floor(Math.random() * 2);
      const selectedFacilitators: number[] = [];
      for (let i = 0; i < numFacilitators; i++) {
        const facilitator = insertedFacilitators[Math.floor(Math.random() * insertedFacilitators.length)];
        if (!selectedFacilitators.includes(facilitator.id)) {
          selectedFacilitators.push(facilitator.id);
          eventFacilitatorsData.push({
            eventId: event.id,
            facilitatorId: facilitator.id,
            role: i === 0 ? 'facilitator' : (Math.random() > 0.5 ? 'assistant' : 'coordinator')
          });
        }
      }
    });
    await db.insert(schema.eventFacilitators).values(eventFacilitatorsData);
    console.log(`✅ Created ${eventFacilitatorsData.length} event-facilitator relationships`);

    // Event participants with improved registration logic
    const eventParticipantsData: { eventId: number; userId: number; registeredAt: number; status: string; notes: string | null }[] = [];
    const currentTime = Date.now() / 1000;
    const oneMonth = 30 * 24 * 60 * 60; // 30 days in seconds
    
    console.log('👥 Creating event participant registrations...');
    
    insertedEvents.forEach(event => {
      // Determine registration likelihood based on event timing
      const timeDiff = event.startTime - currentTime;
      let registrationLikelihood = 1.0;
      
      if (timeDiff > oneMonth) {
        // Events more than a month away: much sparser registration (10-30%)
        registrationLikelihood = 0.1 + Math.random() * 0.2;
      } else if (timeDiff > 0) {
        // Future events within a month: moderate registration (40-80%)
        registrationLikelihood = 0.4 + Math.random() * 0.4;
      } else {
        // Past events: higher registration (60-95%)
        registrationLikelihood = 0.6 + Math.random() * 0.35;
      }
      
      const maxParticipants = event.maxParticipants || 20;
      const numParticipants = Math.floor(maxParticipants * registrationLikelihood);
      
      // Create a pool of available users and shuffle them to avoid duplicates
      const availableUsers = [...insertedUsers];
      for (let i = availableUsers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableUsers[i], availableUsers[j]] = [availableUsers[j], availableUsers[i]];
      }
      
      // Take only the number of participants we need
      const selectedParticipants = availableUsers.slice(0, Math.min(numParticipants, availableUsers.length));
      
      selectedParticipants.forEach(participant => {
        const registeredAt = event.startTime - (Math.random() * 14 * 24 * 60 * 60); // Registered up to 14 days before
        
        // Determine status based on event timing
        let status = 'registered';
        if (timeDiff < 0) {
          // Past events: some might be no-shows or completed
          const rand = Math.random();
          if (rand > 0.95) status = 'no_show';
          else if (rand > 0.9) status = 'cancelled';
          else if (rand > 0.1) status = 'attended';
        } else if (timeDiff < oneMonth) {
          // Future events within a month: mostly registered, some cancelled
          if (Math.random() > 0.95) status = 'cancelled';
        }
        
        eventParticipantsData.push({
          eventId: event.id,
          userId: participant.id,
          registeredAt,
          status,
          notes: Math.random() > 0.7 ? [
            'Looking forward to this activity!',
            'Please save me a seat',
            'Will attend with my friend',
            'Hoping to learn something new',
            'This looks fun!',
            'Regular attendee',
            'First time trying this'
          ][Math.floor(Math.random() * 7)] : null
        });
      });
    });
    
    // Insert participants in batches to avoid SQLite limits
    if (eventParticipantsData.length > 0) {
      console.log(`Inserting ${eventParticipantsData.length} participant registrations in batches...`);
      const batchSize = 1000;
      let totalInserted = 0;
      
      for (let i = 0; i < eventParticipantsData.length; i += batchSize) {
        const batch = eventParticipantsData.slice(i, i + batchSize);
        await db.insert(schema.eventParticipants).values(batch);
        totalInserted += batch.length;
        console.log(`✅ Inserted batch: ${totalInserted}/${eventParticipantsData.length} participant registrations`);
      }
      
      console.log(`✅ Created ${eventParticipantsData.length} event participant registrations`);
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   👥 Users: ${insertedUsers.length}`);
    console.log(`   🛡️ Roles: ${insertedRoles.length}`);
    console.log(`   🔐 Permissions: ${insertedPermissions.length}`);
    console.log(`   🌈 Wellness Dimensions: ${insertedWellnessDimensions.length}`);
    console.log(`   🎨 Hobbies: ${insertedHobbies.length}`);
    console.log(`   🏷️ Tags: ${insertedTags.length}`);
    console.log(`   🏥 Levels of Care: ${insertedLevelsOfCare.length}`);
    console.log(`   📍 Locations: ${insertedLocations.length}`);
    console.log(`   👨‍🏫 Facilitators: ${insertedFacilitators.length}`);
    console.log(`   📚 Event Series: ${insertedEventSeries.length}`);
    console.log(`   🔄 Recurrence Patterns: ${insertedRecurrencePatterns.length}`);
    console.log(`   📅 Events: ${insertedEvents.length}`);
    console.log(`   🔗 Event Relationships: ${eventHobbiesData.length + eventTagsData.length + eventLevelsOfCareData.length + eventFacilitatorsData.length + eventParticipantsData.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Run seeding if this file is executed directly
if (import.meta.main) {
  seed()
    .then(() => {
      console.log('✅ Seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding process failed:', error);
      process.exit(1);
    });
} 