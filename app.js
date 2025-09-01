// Enhanced Research Page JavaScript with Academic Map
// This integrates your existing functionality with new research features and interactive map

// Global state 
let currentPage = 'home'; 
let isDarkMode = false; 
let animationObserver;
let academicMap;

// DOM elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');

// Academic locations data
const academicLocations = [
    {
        id: 'winnipeg',
        name: 'Winnipeg, Canada',
        lat: 49.8951,
        lng: -97.1384,
        type: 'education',
        category: 'Primary Base',
        activities: [
            'PhD Studies - University of Manitoba',
            'Lecturer - Booth University College',
            'Ongoing research since 2020'
        ],
        description: 'Primary academic and research base',
        flag: '🇨🇦'
    },
    {
        id: 'warwick',
        name: 'Warwick, United Kingdom',
        lat: 52.3806,
        lng: -1.5607,
        type: 'seminar',
        category: 'Guest Seminar',
        activities: [
            'Centre for the Study of Women and Gender',
            'Digital Feminism: Intersectionality and Activism',
            'November 2023'
        ],
        description: 'Graduate Seminar Series presentation',
        flag: '🇬🇧'
    },
    {
        id: 'oxford',
        name: 'Oxford, United Kingdom',
        lat: 51.7520,
        lng: -1.2577,
        type: 'seminar',
        category: 'Research Presentation',
        activities: [
            'Graduate Seminars in Economic and Social History',
            'Resource Exploitation and Social Impact in DRC',
            'September 2023'
        ],
        description: 'University of Oxford presentation',
        flag: '🇬🇧'
    },
    {
        id: 'swansea',
        name: 'Swansea, United Kingdom',
        lat: 51.6214,
        lng: -3.9436,
        type: 'conference',
        category: 'Workshop Presenter',
        activities: [
            'TheoriseHAI Workshop - HAI 2023',
            'Hybrid Machine Learning Approaches',
            'October 2023'
        ],
        description: '12th International Conference on Human-Agent Interaction',
        flag: '🇬🇧'
    },
    {
        id: 'athens',
        name: 'Athens, Greece',
        lat: 37.9838,
        lng: 23.7275,
        type: 'conference',
        category: 'International Conference',
        activities: [
            'MARBLE 2025 Conference Speaker',
            'Blockchain Economics Research',
            'Game-Theoretic Approach Presentation'
        ],
        description: '6th International Conference on Mathematical Research for Blockchain Economy',
        flag: '🇬🇷'
    },
    {
        id: 'montreal',
        name: 'Montréal, Canada',
        lat: 45.5017,
        lng: -73.5673,
        type: 'conference',
        category: 'National Conference',
        activities: [
            'Canadian Economics Association',
            'Development Economics Research',
            'Sub-Saharan Africa Studies'
        ],
        description: '59th Annual Meetings of the Canadian Economics Association',
        flag: '🇨🇦'
    },
    {
        id: 'cape-town',
        name: 'Cape Town, South Africa',
        lat: -33.9249,
        lng: 18.4241,
        type: 'collaboration',
        category: 'Research Collaboration',
        activities: [
            'University of Cape Town partnership',
            'Development Economics research',
            'African economic studies'
        ],
        description: 'Ongoing research collaboration',
        flag: '🇿🇦'
    },
    {
        id: 'toronto',
        name: 'Toronto, Canada',
        lat: 43.6532,
        lng: -79.3832,
        type: 'collaboration',
        category: 'Academic Partnership',
        activities: [
            'University of Toronto collaboration',
            'Econometric research projects',
            'Big data applications'
        ],
        description: 'Research collaboration in econometrics',
        flag: '🇨🇦'
    }
];

// Research Manager Class
class ResearchPageManager {
    constructor() {
        this.currentTab = 'overview';
        this.publications = [];
        this.researchData = {};
        this.charts = {};
        this.filters = {
            year: 'all',
            type: 'all'
        };
        
        this.loadResearchData();
        this.init();
    }

    init() {
        this.initializeTabNavigation();
        this.initializePublications();
        this.initializeCharts();
        this.initializeTimeline();
        this.initializeCollaborationNetwork();
        this.bindEvents();
    }

    // Load research data
    loadResearchData() {
        this.publications = [
            {
                id: 1,
                title: "Forecasting Energy Prices Using Machine Learning Algorithms: A Comparative Analysis",
                authors: "Frederic Mirindi, John Doe, Jane Smith",
                venue: "Journal of Economic Forecasting",
                year: 2024,
                type: "journal",
                citations: 45,
                altmetric: 12,
                abstract: "This study compares various machine learning algorithms for forecasting energy prices, focusing on accuracy and computational efficiency. We analyze LSTM, ARIMA, and ensemble methods using historical energy market data.",
                tags: ["Machine Learning", "Energy Economics", "Forecasting", "Time Series"],
                doi: "10.1016/j.jef.2024.001",
                downloadUrl: "#",
                pdfUrl: "#"
            },
            {
                id: 2,
                title: "Advance Toward Artificial Superintelligence with OpenAI's O1 Reinforcement Learning and Ethics",
                authors: "Frederic Mirindi, AI Research Consortium",
                venue: "AI Ethics and Society Conference",
                year: 2024,
                type: "conference",
                citations: 28,
                altmetric: 8,
                abstract: "An examination of ethical considerations in the development of artificial superintelligence, with particular focus on reinforcement learning methodologies and their societal implications.",
                tags: ["AI Ethics", "Superintelligence", "Reinforcement Learning", "Policy"],
                doi: "10.1109/AIES.2024.001",
                downloadUrl: "#",
                pdfUrl: "#"
            },
            {
                id: 3,
                title: "Neural Networks for Predicting Market Trends in Sustainable Industries",
                authors: "Frederic Mirindi, Environmental Economics Team",
                venue: "Sustainable Economics Review",
                year: 2023,
                type: "journal",
                citations: 67,
                altmetric: 15,
                abstract: "We develop and evaluate neural network architectures for predicting market trends in sustainable industries, contributing to better investment decisions and policy formation.",
                tags: ["Neural Networks", "Sustainability", "Market Analysis", "Green Finance"],
                doi: "10.1016/j.ser.2023.045",
                downloadUrl: "#",
                pdfUrl: "#"
            },
            {
                id: 4,
                title: "BIM-Driven Offsite Construction: Pathway to Efficiency, Functionality and Sustainability",
                authors: "Frederic Mirindi, Construction Innovation Lab",
                venue: "Construction Technology International",
                year: 2023,
                type: "journal",
                citations: 32,
                altmetric: 6,
                abstract: "This research explores how Building Information Modeling (BIM) can revolutionize offsite construction processes, leading to improved efficiency and sustainability outcomes.",
                tags: ["BIM", "Construction Technology", "Sustainability", "Innovation"],
                doi: "10.1016/j.cti.2023.078",
                downloadUrl: "#",
                pdfUrl: "#"
            }
        ];

        this.researchAreas = {
            "ai-economics": {
                title: "AI in Economics",
                description: "Pioneering the integration of artificial intelligence in economic analysis and policy making.",
                publications: 8,
                citations: 180,
                projects: ["Economic Policy Simulation Platform", "AI-Driven Market Analysis Tool"],
                collaborators: ["University of Manitoba", "Statistics Canada", "Bank of Canada"],
                keyContributions: [
                    "Developed novel ML algorithms for economic forecasting",
                    "Created policy simulation frameworks using AI",
                    "Published 8 peer-reviewed papers with 180+ citations"
                ]
            },
            "econometrics": {
                title: "Econometrics & Data Science",
                description: "Advanced statistical methods and big data analytics for economic research.",
                publications: 6,
                citations: 145,
                projects: ["Big Data Analytics Platform", "Econometric Modeling Suite"],
                collaborators: ["University of Toronto", "CIBC Economics", "TD Bank"],
                keyContributions: [
                    "Advanced econometric modeling techniques",
                    "Big data applications in economic research",
                    "Statistical software development"
                ]
            },
            "development": {
                title: "Development Economics",
                description: "Understanding economic development patterns and social impact in Sub-Saharan Africa.",
                publications: 4,
                citations: 95,
                projects: ["African Economic Development Study", "Social Impact Assessment Framework"],
                collaborators: ["University of Cape Town", "World Bank", "UNDP"],
                keyContributions: [
                    "Family size and child outcomes research",
                    "Resource exploitation impact studies",
                    "Policy recommendation frameworks"
                ]
            },
            "construction": {
                title: "Construction Technology",
                description: "AI applications in building information modeling and construction efficiency.",
                publications: 3,
                citations: 75,
                projects: ["Smart Construction Platform", "BIM-AI Integration System"],
                collaborators: ["Manitoba Infrastructure", "Construction Association"],
                keyContributions: [
                    "BIM-driven construction methodologies",
                    "AI-enhanced building design",
                    "Sustainability metrics in construction"
                ]
            }
        };

        this.timelineEvents = [
            {
                year: 2024,
                month: "October",
                type: "publication",
                title: "Energy Price Forecasting Study Published",
                description: "Major study on ML algorithms for energy price forecasting published in Journal of Economic Forecasting",
                impact: "45 citations to date"
            },
            {
                year: 2024,
                month: "August",
                type: "conference",
                title: "AI Ethics Conference Presentation",
                description: "Presented research on AI superintelligence ethics at international conference",
                impact: "Featured in 3 news outlets"
            },
            {
                year: 2024,
                month: "June",
                type: "collaboration",
                title: "Bank of Canada Partnership",
                description: "Established research partnership for economic modeling projects",
                impact: "3-year collaboration agreement"
            },
            {
                year: 2023,
                month: "December",
                type: "award",
                title: "Best Paper Award",
                description: "Received best paper award for sustainable market analysis research",
                impact: "Recognition from Sustainable Economics Society"
            }
        ];
    }

    // Initialize tab navigation
    initializeTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
    }

    switchTab(tabId) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');

        this.currentTab = tabId;

        // Load tab-specific content
        this.loadTabContent(tabId);
    }

    loadTabContent(tabId) {
        switch(tabId) {
            case 'publications':
                this.renderPublications();
                break;
            case 'timeline':
                this.renderTimeline();
                break;
            case 'collaborations':
                this.renderCollaborationNetwork();
                break;
            case 'impact':
                this.renderImpactMetrics();
                break;
        }
    }

    // Initialize publications system
    initializePublications() {
        this.bindPublicationFilters();
        this.renderPublications();
    }

    bindPublicationFilters() {
        const yearFilter = document.getElementById('year-filter');
        const typeFilter = document.getElementById('type-filter');
        const viewToggle = document.getElementById('view-toggle');

        if (yearFilter) {
            yearFilter.addEventListener('change', (e) => {
                this.filters.year = e.target.value;
                this.renderPublications();
            });
        }

        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.filters.type = e.target.value;
                this.renderPublications();
            });
        }

        if (viewToggle) {
            viewToggle.addEventListener('click', () => {
                this.togglePublicationView();
            });
        }
    }

    renderPublications() {
        const container = document.getElementById('publications-container');
        if (!container) return;

        let filteredPublications = this.publications;

        // Apply filters
        if (this.filters.year !== 'all') {
            filteredPublications = filteredPublications.filter(pub => pub.year.toString() === this.filters.year);
        }

        if (this.filters.type !== 'all') {
            filteredPublications = filteredPublications.filter(pub => pub.type === this.filters.type);
        }

        // Clear container
        container.innerHTML = '';

        // Render publications
        filteredPublications.forEach(publication => {
            const publicationCard = this.createPublicationCard(publication);
            container.appendChild(publicationCard);
        });

        // Add animations
        this.animatePublications();
    }

    createPublicationCard(publication) {
        const card = document.createElement('article');
        card.className = 'publication-card enhanced-card';
        card.setAttribute('data-year', publication.year);
        card.setAttribute('data-type', publication.type);

        card.innerHTML = `
            <div class="publication-header">
                <div class="publication-type-badge">${publication.type.toUpperCase()}</div>
                <div class="publication-metrics">
                    <span class="citation-count">
                        <span class="metric-icon">📊</span>
                        <span class="metric-value">${publication.citations}</span>
                    </span>
                    <span class="altmetric-score">
                        <span class="metric-icon">🌐</span>
                        <span class="metric-value">${publication.altmetric}</span>
                    </span>
                </div>
            </div>
            
            <div class="publication-content">
                <h3 class="publication-title">${publication.title}</h3>
                <div class="publication-authors">${publication.authors}</div>
                <div class="publication-venue">${publication.venue}</div>
                <div class="publication-date">${publication.year}</div>
                
                <div class="publication-abstract">
                    <p class="abstract-text">${this.truncateText(publication.abstract, 150)}</p>
                    <button class="expand-abstract-btn" onclick="researchManager.toggleAbstract(this, ${publication.id})">Read More</button>
                </div>
                
                <div class="publication-tags">
                    ${publication.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            
            <div class="publication-actions">
                <button class="action-btn view-btn" onclick="researchManager.viewPublication(${publication.id})">
                    <span class="btn-icon">👁️</span>
                    <span class="btn-text">View</span>
                </button>
                <button class="action-btn download-btn" onclick="researchManager.downloadPublication(${publication.id})">
                    <span class="btn-icon">⬇️</span>
                    <span class="btn-text">PDF</span>
                </button>
                <button class="action-btn cite-btn" onclick="researchManager.showCitation(${publication.id})">
                    <span class="btn-icon">📋</span>
                    <span class="btn-text">Cite</span>
                </button>
                <button class="action-btn share-btn" onclick="researchManager.sharePublication(${publication.id})">
                    <span class="btn-icon">🔗</span>
                    <span class="btn-text">Share</span>
                </button>
            </div>
        `;

        return card;
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    toggleAbstract(button, publicationId) {
        const publication = this.publications.find(p => p.id === publicationId);
        const abstractText = button.previousElementSibling;
        
        if (button.textContent === 'Read More') {
            abstractText.textContent = publication.abstract;
            button.textContent = 'Read Less';
        } else {
            abstractText.textContent = this.truncateText(publication.abstract, 150);
            button.textContent = 'Read More';
        }
    }

    // Chart initialization
    initializeCharts() {
        // Wait for Chart.js to be available
        if (typeof Chart === 'undefined') {
            setTimeout(() => this.initializeCharts(), 100);
            return;
        }

        this.createPublicationsByYearChart();
        this.createCitationsTimelineChart();
        this.createResearchAreasChart();
        this.createImpactCharts();
    }

    createPublicationsByYearChart() {
        const canvas = document.getElementById('publications-year-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        const data = {
            labels: ['2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Publications',
                data: [2, 4, 8, 6],
                backgroundColor: 'rgba(33, 128, 141, 0.6)',
                borderColor: 'rgba(33, 128, 141, 1)',
                borderWidth: 2,
                borderRadius: 4
            }]
        };

        this.charts.publicationsByYear = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    createCitationsTimelineChart() {
        const canvas = document.getElementById('citations-timeline-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        const data = {
            labels: ['2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Citations',
                data: [15, 45, 120, 270],
                borderColor: 'rgba(33, 128, 141, 1)',
                backgroundColor: 'rgba(33, 128, 141, 0.1)',
                fill: true,
                tension: 0.4
            }]
        };

        this.charts.citationsTimeline = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createResearchAreasChart() {
        const canvas = document.getElementById('areas-distribution-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        const data = {
            labels: ['AI in Economics', 'Econometrics', 'Development', 'Construction Tech'],
            datasets: [{
                data: [8, 6, 4, 3],
                backgroundColor: [
                    'rgba(33, 128, 141, 0.8)',
                    'rgba(50, 184, 198, 0.8)',
                    'rgba(29, 116, 128, 0.8)',
                    'rgba(45, 166, 178, 0.8)'
                ],
                borderWidth: 0
            }]
        };

        this.charts.researchAreas = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createImpactCharts() {
        // Citation Impact Chart
        const citationCanvas = document.getElementById('citation-impact-chart');
        if (citationCanvas) {
            const ctx = citationCanvas.getContext('2d');
            
            const data = {
                labels: ['2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Total Citations',
                    data: [15, 60, 180, 450],
                    backgroundColor: 'rgba(33, 128, 141, 0.6)',
                    borderColor: 'rgba(33, 128, 141, 1)',
                    borderWidth: 2
                }]
            };

            this.charts.citationImpact = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        // Journal Impact Distribution Chart
        const journalCanvas = document.getElementById('journal-impact-chart');
        if (journalCanvas) {
            const ctx = journalCanvas.getContext('2d');
            
            const data = {
                labels: ['Q1 Journals', 'Q2 Journals', 'Conferences', 'Others'],
                datasets: [{
                    data: [8, 6, 4, 2],
                    backgroundColor: [
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(156, 163, 175, 0.8)'
                    ]
                }]
            };

            this.charts.journalImpact = new Chart(ctx, {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    // Timeline functionality
    initializeTimeline() {
        this.bindTimelineFilters();
        this.renderTimeline();
    }

    bindTimelineFilters() {
        const filterButtons = document.querySelectorAll('.timeline-filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active from all
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active to clicked
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                this.filterTimeline(filter);
            });
        });
    }

    renderTimeline() {
        const container = document.getElementById('timeline-events');
        if (!container) return;

        container.innerHTML = '';

        this.timelineEvents.forEach((event, index) => {
            const eventElement = this.createTimelineEvent(event, index);
            container.appendChild(eventElement);
        });

        this.animateTimelineEvents();
    }

    createTimelineEvent(event, index) {
        const eventDiv = document.createElement('div');
        eventDiv.className = `timeline-event ${event.type}`;
        eventDiv.setAttribute('data-type', event.type);
        
        const side = index % 2 === 0 ? 'left' : 'right';
        eventDiv.classList.add(side);

        eventDiv.innerHTML = `
            <div class="timeline-event-content">
                <div class="timeline-event-date">${event.month} ${event.year}</div>
                <h4 class="timeline-event-title">${event.title}</h4>
                <p class="timeline-event-description">${event.description}</p>
                <div class="timeline-event-impact">${event.impact}</div>
            </div>
            <div class="timeline-event-marker"></div>
        `;

        return eventDiv;
    }

    filterTimeline(filter) {
        const events = document.querySelectorAll('.timeline-event');
        events.forEach(event => {
            if (filter === 'all' || event.getAttribute('data-type') === filter) {
                event.style.display = 'block';
            } else {
                event.style.display = 'none';
            }
        });
    }

    // Collaboration Network
    initializeCollaborationNetwork() {
        this.createCollaborationNetwork();
    }

    createCollaborationNetwork() {
        const svg = document.getElementById('collaboration-network-svg');
        if (!svg) return;

        // Sample network data
        const nodes = [
            { id: 'frederic', name: 'Frederic Mirindi', type: 'researcher', x: 400, y: 200 },
            { id: 'uofm', name: 'University of Manitoba', type: 'institution', x: 200, y: 120 },
            { id: 'booth', name: 'Booth University', type: 'institution', x: 600, y: 120 },
            { id: 'bank-canada', name: 'Bank of Canada', type: 'organization', x: 300, y: 280 },
            { id: 'stats-can', name: 'Statistics Canada', type: 'organization', x: 500, y: 280 }
        ];

        const links = [
            { source: 'frederic', target: 'uofm', strength: 10 },
            { source: 'frederic', target: 'booth', strength: 8 },
            { source: 'frederic', target: 'bank-canada', strength: 6 },
            { source: 'frederic', target: 'stats-can', strength: 4 }
        ];

        this.renderNetwork(svg, nodes, links);
    }

    renderNetwork(svg, nodes, links) {
        // Clear existing content
        svg.innerHTML = '';

        // Create links
        links.forEach(link => {
            const sourceNode = nodes.find(n => n.id === link.source);
            const targetNode = nodes.find(n => n.id === link.target);
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', sourceNode.x);
            line.setAttribute('y1', sourceNode.y);
            line.setAttribute('x2', targetNode.x);
            line.setAttribute('y2', targetNode.y);
            line.setAttribute('stroke', 'rgba(33, 128, 141, 0.6)');
            line.setAttribute('stroke-width', link.strength / 2);
            
            svg.appendChild(line);
        });

        // Create nodes
        nodes.forEach(node => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', node.type === 'researcher' ? 20 : 15);
            circle.setAttribute('fill', this.getNodeColor(node.type));
            circle.setAttribute('stroke', '#fff');
            circle.setAttribute('stroke-width', 2);
            circle.style.cursor = 'pointer';
            
            // Add hover effect
            circle.addEventListener('mouseenter', () => {
                circle.setAttribute('r', parseInt(circle.getAttribute('r')) + 5);
            });
            
            circle.addEventListener('mouseleave', () => {
                circle.setAttribute('r', parseInt(circle.getAttribute('r')) - 5);
            });
            
            svg.appendChild(circle);

            // Add labels
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y + 35);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '12');
            text.setAttribute('fill', 'var(--color-text)');
            text.textContent = node.name;
            
            svg.appendChild(text);
        });
    }

    getNodeColor(type) {
        const colors = {
            researcher: 'rgba(33, 128, 141, 1)',
            institution: 'rgba(50, 184, 198, 1)',
            organization: 'rgba(29, 116, 128, 1)'
        };
        return colors[type] || 'rgba(156, 163, 175, 1)';
    }

    // Animation utilities
    animatePublications() {
        const cards = document.querySelectorAll('.publication-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                // Trigger animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }

    animateTimelineEvents() {
        const events = document.querySelectorAll('.timeline-event');
        events.forEach((event, index) => {
            setTimeout(() => {
                event.classList.add('animate-in');
            }, index * 200);
        });
    }

    // Utility functions
    bindEvents() {
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    handleResize() {
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });

        // Resize map if it exists
        if (academicMap) {
            setTimeout(() => {
                academicMap.invalidateSize();
            }, 100);
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public methods for external calls
    showAreaDetails(areaId) {
        const area = this.researchAreas[areaId];
        if (!area) return;

        const modal = document.getElementById('research-area-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = area.title;
        modalBody.innerHTML = `
            <div class="area-details">
                <p class="area-description">${area.description}</p>
                
                <div class="area-stats-detailed">
                    <div class="stat-item">
                        <strong>${area.publications}</strong> Publications
                    </div>
                    <div class="stat-item">
                        <strong>${area.citations}</strong> Citations
                    </div>
                </div>
                
                <h4>Active Projects</h4>
                <ul class="projects-list">
                    ${area.projects.map(project => `<li>${project}</li>`).join('')}
                </ul>
                
                <h4>Key Collaborators</h4>
                <ul class="collaborators-list">
                    ${area.collaborators.map(collab => `<li>${collab}</li>`).join('')}
                </ul>
                
                <h4>Key Contributions</h4>
                <ul class="contributions-list">
                    ${area.keyContributions.map(contrib => `<li>${contrib}</li>`).join('')}
                </ul>
            </div>
        `;

        modal.classList.add('active');
    }

    closeAreaModal() {
        const modal = document.getElementById('research-area-modal');
        modal.classList.remove('active');
    }

    viewPublication(publicationId) {
        const publication = this.publications.find(p => p.id === publicationId);
        if (publication) {
            window.open(publication.downloadUrl, '_blank');
        }
    }

    downloadPublication(publicationId) {
        const publication = this.publications.find(p => p.id === publicationId);
        if (publication) {
            console.log('Downloading PDF for:', publication.title);
            window.open(publication.pdfUrl, '_blank');
        }
    }

    showCitation(publicationId) {
        const publication = this.publications.find(p => p.id === publicationId);
        if (publication) {
            const citation = this.generateCitation(publication);
            
            navigator.clipboard.writeText(citation).then(() => {
                this.showNotification('Citation copied to clipboard!');
            });
        }
    }

    generateCitation(publication) {
        return `${publication.authors} (${publication.year}). ${publication.title}. ${publication.venue}. DOI: ${publication.doi}`;
    }

    sharePublication(publicationId) {
        const publication = this.publications.find(p => p.id === publicationId);
        if (publication) {
            const url = `${window.location.origin}/publications/${publicationId}`;
            
            if (navigator.share) {
                navigator.share({
                    title: publication.title,
                    text: publication.abstract.substring(0, 100) + '...',
                    url: url
                });
            } else {
                navigator.clipboard.writeText(url).then(() => {
                    this.showNotification('Publication URL copied to clipboard!');
                });
            }
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    togglePublicationView() {
        const container = document.getElementById('publications-container');
        const toggleBtn = document.getElementById('view-toggle');
        
        if (container.classList.contains('grid-view')) {
            container.classList.remove('grid-view');
            container.classList.add('list-view');
            toggleBtn.querySelector('.toggle-text').textContent = 'Grid View';
            toggleBtn.querySelector('.toggle-icon').textContent = '⊞';
        } else {
            container.classList.remove('list-view');
            container.classList.add('grid-view');
            toggleBtn.querySelector('.toggle-text').textContent = 'List View';
            toggleBtn.querySelector('.toggle-icon').textContent = '☰';
        }
    }
}

// Academic Map Manager Class
class AcademicMapManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.markerIcons = {};
        this.init();
    }

    init() {
        this.createMarkerIcons();
    }

    createMarkerIcons() {
        // Define custom marker styles for different activity types
        this.markerIcons = {
            education: this.createCustomIcon('🎓', '#21808d'),
            conference: this.createCustomIcon('🎤', '#32b8c6'),
            collaboration: this.createCustomIcon('🤝', '#1d7480'),
            seminar: this.createCustomIcon('📊', '#2da6b2')
        };
    }

    createCustomIcon(emoji, color) {
        return L.divIcon({
            html: `
                <div style="
                    background: ${color};
                    border: 2px solid white;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                    color: white;
                ">
                    ${emoji}
                </div>
            `,
            className: 'custom-academic-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });
    }

    initializeMap() {
        const mapContainer = document.getElementById('academic-world-map');
        if (!mapContainer || this.map) return;

        // Initialize the map
        this.map = L.map('academic-world-map', {
            center: [45.0, -75.0], // Center on North America/Europe
            zoom: 3,
            zoomControl: true,
            attributionControl: true
        });

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);

        // Add academic locations
        this.addAcademicLocations();

        // Set global reference
        academicMap = this.map;

        return this.map;
    }

    addAcademicLocations() {
        this.markers = [];

        academicLocations.forEach(location => {
            const marker = L.marker([location.lat, location.lng], {
                icon: this.markerIcons[location.type]
            }).addTo(this.map);

            // Create popup content
            const popupContent = this.createPopupContent(location);
            marker.bindPopup(popupContent, {
                maxWidth: 300,
                className: 'academic-popup'
            });

            // Add to markers array
            this.markers.push(marker);

            // Add click event for detailed view
            marker.on('click', () => {
                this.showLocationDetails(location);
            });
        });

        // Fit map to show all markers
        const group = new L.featureGroup(this.markers);
        this.map.fitBounds(group.getBounds().pad(0.1));
    }

    createPopupContent(location) {
        return `
            <div class="location-popup">
                <div class="popup-header">
                    <h4>${location.flag} ${location.name}</h4>
                    <span class="location-category">${location.category}</span>
                </div>
                <p class="popup-description">${location.description}</p>
                <div class="popup-activities">
                    <strong>Activities:</strong>
                    <ul>
                        ${location.activities.map(activity => `<li>${activity}</li>`).join('')}
                    </ul>
                </div>
                <button class="popup-details-btn" onclick="mapManager.showLocationDetails('${location.id}')">
                    View Details
                </button>
            </div>
        `;
    }

    showLocationDetails(locationId) {
        const location = academicLocations.find(loc => loc.id === locationId);
        if (!location) return;

        // Create modal or detailed view
        console.log('Showing details for:', location);
        
        // For now, just highlight the location
        this.highlightLocation(location);
    }

    highlightLocation(location) {
        // Find the marker for this location
        const marker = this.markers.find(m => 
            m.getLatLng().lat === location.lat && m.getLatLng().lng === location.lng
        );

        if (marker) {
            // Center map on location
            this.map.setView([location.lat, location.lng], 8);
            
            // Open popup
            marker.openPopup();
            
            // Add temporary highlight circle
            const highlightCircle = L.circle([location.lat, location.lng], {
                color: '#21808d',
                fillColor: '#32b8c6',
                fillOpacity: 0.2,
                radius: 50000
            }).addTo(this.map);

            // Remove highlight after 3 seconds
            setTimeout(() => {
                this.map.removeLayer(highlightCircle);
            }, 3000);
        }
    }

    filterLocationsByType(type) {
        this.markers.forEach(marker => {
            const location = academicLocations.find(loc => 
                marker.getLatLng().lat === loc.lat && marker.getLatLng().lng === loc.lng
            );
            
            if (type === 'all' || location.type === type) {
                marker.addTo(this.map);
            } else {
                this.map.removeLayer(marker);
            }
        });
    }

    resetMapView() {
        if (!this.map) return;
        
        // Show all markers
        this.filterLocationsByType('all');
        
        // Fit bounds to all markers
        const group = new L.featureGroup(this.markers);
        this.map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeInteractiveElements();
    initializeCharts();
    initializeForms();
    
    // Initialize research manager
    window.researchManager = new ResearchPageManager();
    
    // Initialize map manager
    window.mapManager = new AcademicMapManager();
    
    // Set initial page
    showPage('home');
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            easing: 'ease-out',
            once: true
        });
    }

    // Initialize numeric counters animation
    initializeCounters();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
    } else {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    document.documentElement.setAttribute('data-color-scheme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon();
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-color-scheme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = isDarkMode ? '☀️' : '🌙';
}

// Navigation
function initializeNavigation() {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn') && e.target.hasAttribute('data-page')) {
            const page = e.target.getAttribute('data-page');
            showPage(page);
        }
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;

        // Initialize page-specific features
        if (pageId === 'ai-implementation') {
            initializeAIToolsPage();
        } else if (pageId === 'academic-map') {
            // Initialize map when map page is shown
            setTimeout(() => {
                if (window.mapManager && !window.mapManager.map) {
                    window.mapManager.initializeMap();
                }
            }, 100);
        }
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.highlight-number');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16); // ~60fps
}

// Animations
function initializeAnimations() {
    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const animatedElements = document.querySelectorAll('.research-card, .paper-card, .conference-card, .ai-tool-card');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        animationObserver.observe(el);
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    initializeResearchDemos();
    initializeSkillsAnimation();
}

function initializeResearchDemos() {
    const simulateBtn = document.querySelector('.simulate-btn');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', function() {
            const resultDiv = document.querySelector('.simulation-result');
            this.textContent = 'Running...';
            this.disabled = true;
            setTimeout(() => {
                const results = [
                    'GDP Growth: +2.3%',
                    'Unemployment Rate: -0.8%',
                    'Inflation Impact: +0.5%',
                    'Consumer Confidence: +5.2%'
                ];
                resultDiv.innerHTML = `<h4>Policy Impact Results</h4><ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>`;
                this.textContent = 'Run Simulation';
                this.disabled = false;
            }, 1500);
        });
    }
}

function initializeSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// AI Tools Page
function initializeAIToolsPage() {
    setTimeout(() => {
        initializeAITools();
    }, 100);
}

function initializeAITools() {
    const forecastBtn = document.getElementById('run-forecast');
    if (forecastBtn && !forecastBtn.hasAttribute('data-initialized')) {
        forecastBtn.setAttribute('data-initialized', 'true');
        forecastBtn.addEventListener('click', function() {
            const indicator = document.getElementById('indicator-select').value;
            const period = document.getElementById('forecast-period').value;
            const resultDiv = document.querySelector('.forecast-result');
            this.textContent = 'Generating...';
            this.disabled = true;
            setTimeout(() => {
                resultDiv.style.display = 'block';
                const canvas = document.getElementById('forecast-result-chart');
                if (canvas) {
                    generateForecastChart(canvas, indicator, period);
                }
                const summary = document.createElement('div');
                summary.innerHTML = `
                    <h4>Forecast Results</h4>
                    <p><strong>Indicator:</strong> ${indicator.toUpperCase()}</p>
                    <p><strong>Period:</strong> ${period} months</p>
                    <p><strong>Trend:</strong> ${Math.random() > 0.5 ? 'Upward' : 'Stable'}</p>
                    <p><strong>Confidence:</strong> ${(Math.random() * 20 + 75).toFixed(1)}%</p>
                `;
                const existingSummary = resultDiv.querySelector('div:not(canvas)');
                if (existingSummary) {
                    existingSummary.remove();
                }
                resultDiv.appendChild(summary);
                this.textContent = 'Generate Forecast';
                this.disabled = false;
            }, 1500);
        });
    }

    const simulateBtn = document.getElementById('simulate-policy');
    if (simulateBtn && !simulateBtn.hasAttribute('data-initialized')) {
        simulateBtn.setAttribute('data-initialized', 'true');
        simulateBtn.addEventListener('click', function() {
            const policyType = document.getElementById('policy-type').value;
            const magnitude = document.getElementById('impact-magnitude').value;
            const resultsDiv = document.querySelector('.simulation-results');
            this.textContent = 'Simulating...';
            this.disabled = true;
            setTimeout(() => {
                const metrics = generatePolicyMetrics(policyType, magnitude);
                resultsDiv.innerHTML = `
                    <h4>Policy Impact Simulation</h4>
                    <div class="result-metrics">
                        ${metrics.map(metric => `
                            <div class="metric-item">
                                <span class="metric-value">${metric.value}</span>
                                <span class="metric-label">${metric.label}</span>
                            </div>
                        `).join('')}
                    </div>
                    <p><strong>Confidence:</strong> ${(Math.random() * 20 + 75).toFixed(1)}%</p>
                `;
                this.textContent = 'Simulate Impact';
                this.disabled = false;
            }, 1500);
        });
    }

    // Range input update
    const rangeInput = document.getElementById('impact-magnitude');
    if (rangeInput) {
        const rangeValue = document.querySelector('.range-value');
        rangeInput.addEventListener('input', function() {
            if (rangeValue) {
                rangeValue.textContent = this.value;
            }
        });
    }
}

// Chart generation functions
function generateForecastChart(canvas, indicator, period) {
    if (!canvas || typeof Chart === 'undefined') return;
    
    const ctx = canvas.getContext('2d');
    const labels = [];
    const data = [];
    
    for (let i = 0; i < parseInt(period); i++) {
        labels.push(`Month ${i + 1}`);
        data.push(Math.random() * 100 + 50);
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: indicator.toUpperCase(),
                data: data,
                borderColor: 'rgba(33, 128, 141, 1)',
                backgroundColor: 'rgba(33, 128, 141, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function generatePolicyMetrics(policyType, magnitude) {
    const metrics = [
        { label: 'GDP Impact', value: `${(Math.random() * 2 - 1).toFixed(1)}%` },
        { label: 'Employment', value: `${(Math.random() * 3 - 1.5).toFixed(1)}%` },
        { label: 'Inflation', value: `${(Math.random() * 1.5).toFixed(1)}%` },
        { label: 'Consumer Confidence', value: `${(Math.random() * 10).toFixed(1)}%` }
    ];
    return metrics;
}

// NLP Demo
function analyzeText() {
    const input = document.getElementById('nlp-input');
    const resultDiv = document.querySelector('.sentiment-analysis-result');
    
    if (!input || !input.value.trim()) return;
    
    const text = input.value.trim();
    const sentiment = Math.random() > 0.5 ? 'Positive' : 'Negative';
    const score = (Math.random() * 0.4 + 0.6).toFixed(2);
    
    resultDiv.innerHTML = `
        <h4>Sentiment Analysis Results</h4>
        <p><strong>Overall Sentiment:</strong> ${sentiment}</p>
        <p><strong>Confidence Score:</strong> ${score}</p>
        <p><strong>Key Terms:</strong> economic, growth, policy, market</p>
    `;
}

// Trading Simulation
function runTradingSimulation() {
    const canvas = document.getElementById('trading-chart');
    if (!canvas || typeof Chart === 'undefined') return;
    
    const ctx = canvas.getContext('2d');
    const data = [];
    for (let i = 0; i < 30; i++) {
        data.push(Math.random() * 50 + 100);
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 30}, (_, i) => `Day ${i + 1}`),
            datasets: [{
                label: 'Portfolio Value',
                data: data,
                borderColor: 'rgba(33, 128, 141, 1)',
                backgroundColor: 'rgba(33, 128, 141, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Charts initialization
function initializeCharts() {
    // This is handled by ResearchPageManager
}

// Forms initialization
function initializeForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
        });
    });
}

// Widget Functions
function updateWinnipegTime() {
    const watchSpan = document.getElementById('watch-time');
    if (!watchSpan) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-CA", {
        hour12: false,
        timeZone: "America/Winnipeg"
    });
    watchSpan.textContent = timeString;
}

async function updateWinnipegWeather() {
    const tempSpan = document.getElementById('weather-temp');
    const descSpan = document.getElementById('weather-desc');
    const iconSpan = document.getElementById('weather-icon');
    
    if (!tempSpan || !descSpan || !iconSpan) return;
    
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=49.8951&longitude=-97.1384&current_weather=true`;
        const response = await fetch(url);
        const json = await response.json();
        
        const temp = Math.round(json.current_weather.temperature);
        const code = json.current_weather.weathercode;
        
        let description = "Clear", icon = "☀️";
        if (code >= 51 && code < 70) {
            icon = "🌧️"; description = "Rain";
        } else if (code >= 71 && code < 80) {
            icon = "❄️"; description = "Snow";
        } else if (code === 0) {
            icon = "☀️"; description = "Sunny";
        } else if (code > 2 && code < 5) {
            icon = "⛅"; description = "Partly Cloudy";
        } else if (code < 3) {
            icon = "🌤️"; description = "Mainly Sunny";
        } else if (code >= 3 && code < 5) {
            icon = "☁️"; description = "Cloudy";
        }
        
        tempSpan.textContent = temp + "°C";
        descSpan.textContent = description;
        iconSpan.textContent = icon;
    } catch (e) {
        tempSpan.textContent = "—";
        descSpan.textContent = "Unavailable";
        iconSpan.textContent = "⚠️";
    }
}

// Economic Facts Widget
const econFacts = [
    "Canada's S&P/TSX is among the world's top 10 largest stock exchanges.",
    "The Consumer Price Index (CPI) measures the average change in prices paid by consumers for goods and services.",
    "AI in economics enables better policy simulations and more accurate forecasting.",
    "\"In the middle of difficulty lies opportunity.\" — Albert Einstein",
    "Central banks use interest rates to regulate inflation and stimulate or cool the economy.",
    "Gross Domestic Product (GDP) is the broadest quantitative measure of a nation's total economic activity.",
    "Elasticity measures how much demand or supply responds to changes in price.",
    "\"Economics is the study of how society manages its scarce resources.\" — Gregory Mankiw",
    "Scarcity is the basic economic problem that arises because resources are limited and wants are unlimited.",
    "Inflation represents the rate at which the general level of prices for goods and services rises.",
    "\"The only function of economic forecasting is to make astrology look respectable.\" — John Kenneth Galbraith",
    "A recession is defined as two consecutive quarters of negative economic growth.",
    "\"Price is what you pay. Value is what you get.\" — Warren Buffett",
    "\"There is no such thing as a free lunch.\" — Milton Friedman",
    "\"An investment in knowledge pays the best interest.\" — Benjamin Franklin"
];

function displayRandomFact() {
    const factBox = document.getElementById('fact-box');
    if (!factBox) return;
    const index = Math.floor(Math.random() * econFacts.length);
    factBox.textContent = econFacts[index];
}

// Global functions for onclick handlers
function showAreaDetails(areaId) {
    if (window.researchManager) {
        window.researchManager.showAreaDetails(areaId);
    }
}

function closeAreaModal() {
    if (window.researchManager) {
        window.researchManager.closeAreaModal();
    }
}

function resetNetwork() {
    if (window.researchManager) {
        window.researchManager.createCollaborationNetwork();
    }
}

function centerNetwork() {
    console.log('Centering network view');
}

// Map utility functions
function filterMapLocations(type) {
    if (window.mapManager) {
        window.mapManager.filterLocationsByType(type);
    }
}

function resetMapView() {
    if (window.mapManager) {
        window.mapManager.resetMapView();
    }
}

function centerMapView() {
    if (window.mapManager && window.mapManager.map) {
        window.mapManager.resetMapView();
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize widget updates
setInterval(updateWinnipegTime, 1000);
updateWinnipegTime();

updateWinnipegWeather();
setInterval(updateWinnipegWeather, 10 * 60 * 1000);

displayRandomFact();

// Performance optimization  
window.addEventListener('beforeunload', function() {
    if (animationObserver) {
        animationObserver.disconnect();
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Export functions for global access
window.showPage = showPage;
window.toggleTheme = toggleTheme;