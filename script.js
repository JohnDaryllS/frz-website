// Calendar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample event data - in a real app, this would come from a database
    const events = [
        {
            id: 1,
            title: "Weekly Scrim Night",
            date: new Date(2023, 5, 15), // June 15, 2023 (month is 0-indexed)
            time: "8:00 PM EST",
            description: "Matchup against Crimson Squad (Best of 3). Maps: Bind, Ascent, Haven. All main roster members expected to attend."
        },
        {
            id: 2,
            title: "Radiant Rush Tournament",
            date: new Date(2023, 5, 22), // June 22, 2023
            time: "7:00 PM EST",
            description: "$500 prize pool | 16 teams | Double elimination bracket. Main roster will compete, academy team may participate if spots available."
        },
        {
            id: 3,
            title: "Agent Strategy Workshop",
            date: new Date(2023, 5, 13), // June 13, 2023
            time: "6:30 PM EST",
            description: "Learn advanced agent strategies and team compositions with our coaches."
        },
        {
            id: 4,
            title: "Community Game Night",
            date: new Date(2023, 5, 21), // June 21, 2023
            time: "9:00 PM EST",
            description: "Casual games with clan members and community. All ranks welcome!"
        }
    ];

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Initialize calendar
    renderCalendar(currentMonth, currentYear, events);

    // Previous month button
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear, events);
    });

    // Next month button
    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear, events);
    });

    // Function to render calendar
    function renderCalendar(month, year, events) {
        const calendarGrid = document.getElementById('calendar-grid');
        const calendarTitle = document.querySelector('.calendar-title');
        
        // Set calendar title
        const monthNames = ["January", "February", "March", "April", "May", "June", 
                          "July", "August", "September", "October", "November", "December"];
        calendarTitle.textContent = `${monthNames[month]} ${year}`;
        
        // Clear previous calendar
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Get first day of month and total days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Get days from previous month
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Add empty cells for days from previous month
        for (let i = 0; i < firstDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day prev-month';
            dayElement.textContent = daysInPrevMonth - firstDay + i + 1;
            calendarGrid.appendChild(dayElement);
        }
        
        // Add days of current month
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = i;
            
            // Check if this is today
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Check if this day has events
            const dayEvents = events.filter(event => 
                event.date.getDate() === i && 
                event.date.getMonth() === month && 
                event.date.getFullYear() === year
            );
            
            if (dayEvents.length > 0) {
                dayElement.classList.add('event');
                dayElement.dataset.date = `${month+1}/${i}/${year}`;
                
                // Add click event to show events for this day
                dayElement.addEventListener('click', () => {
                    displayEventsForDate(dayEvents);
                });
            }
            
            calendarGrid.appendChild(dayElement);
        }
        
        // Calculate days needed from next month
        const totalCells = firstDay + daysInMonth;
        const remainingCells = totalCells > 35 ? 42 - totalCells : 35 - totalCells;
        
        // Add days from next month
        for (let i = 1; i <= remainingCells; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day next-month';
            dayElement.textContent = i;
            calendarGrid.appendChild(dayElement);
        }
    }
    
    // Function to display events for a specific date
    function displayEventsForDate(events) {
        const eventsDisplay = document.getElementById('events-display');
        eventsDisplay.innerHTML = '';
        
        if (events.length === 0) {
            eventsDisplay.innerHTML = '<p>No events scheduled for this day.</p>';
            return;
        }
        
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <h3>${event.title}</h3>
                <div class="event-date">
                    <i class="far fa-calendar-alt"></i> ${event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} | ${event.time}
                </div>
                <div class="event-details">
                    ${event.description}
                </div>
                <div class="event-actions">
                    <button class="btn">RSVP</button>
                    <button class="btn btn-secondary">More Info</button>
                </div>
            `;
            eventsDisplay.appendChild(eventCard);
        });
    }
    
    // Initialize with today's events
    const todayEvents = events.filter(event => 
        event.date.getDate() === new Date().getDate() && 
        event.date.getMonth() === new Date().getMonth() && 
        event.date.getFullYear() === new Date().getFullYear()
    );
    displayEventsForDate(todayEvents);
});