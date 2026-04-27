// Generated from 2026 Senior Software Engineer Roadmap
// Structure: Pillar -> Category -> (optional Subgroup) -> Items

export type RoadmapItem = { id: string; label: string };
export type RoadmapSubgroup = { id: string; label: string; items: RoadmapItem[] };
export type RoadmapCategory = {
  id: string;
  label: string;
  subgroups?: RoadmapSubgroup[];
  items?: RoadmapItem[];
};
export type RoadmapPillar = {
  id: string;
  number: string;
  label: string;
  tagline: string;
  categories: RoadmapCategory[];
};

export const ROADMAP: RoadmapPillar[] = [
  {
    id: 'p1',
    number: '01',
    label: 'Technical Foundation',
    tagline: 'The bedrock — stack mastery, system design, clean code, algorithms, testing.',
    categories: [
      {
        id: 'p1-stack',
        label: 'Tech Stack Mastery',
        subgroups: [
          {
            id: 'p1-stack-fe',
            label: 'Frontend',
            items: [
              { id: 'p1-stack-fe-1', label: 'HTML semantics (tags, elements, attributes)' },
              { id: 'p1-stack-fe-2', label: 'CSS (box model, positioning, layout, flexbox, grid)' },
              { id: 'p1-stack-fe-3', label: 'Responsive design' },
              { id: 'p1-stack-fe-4', label: 'JavaScript basics (variables, types, functions, conditionals, events)' },
              { id: 'p1-stack-fe-5', label: 'Async JavaScript (event loop, promises, async/await, fetch)' },
              { id: 'p1-stack-fe-6', label: 'DOM manipulation and event loop' },
              { id: 'p1-stack-fe-7', label: 'Pick a framework (React / Angular / Vue / Svelte)' },
              { id: 'p1-stack-fe-8', label: 'JSX & Components' },
              { id: 'p1-stack-fe-9', label: 'Props & State' },
              { id: 'p1-stack-fe-10', label: 'Component lifecycle (mount / update / unmount)' },
              { id: 'p1-stack-fe-11', label: 'Hooks' },
              { id: 'p1-stack-fe-12', label: 'State management (Context API, Redux, etc.)' },
              { id: 'p1-stack-fe-13', label: 'React Router' },
              { id: 'p1-stack-fe-14', label: 'Forms & event handling' },
              { id: 'p1-stack-fe-15', label: 'Meta frameworks (Next.js, Nuxt, SvelteKit)' },
              { id: 'p1-stack-fe-16', label: 'Critical render path' },
              { id: 'p1-stack-fe-17', label: 'Efficient rendering' },
            ],
          },
          {
            id: 'p1-stack-be',
            label: 'Backend',
            items: [
              { id: 'p1-stack-be-1', label: 'Pick a language (Node / Python / Java / C# / Go / Kotlin)' },
              { id: 'p1-stack-be-2', label: 'Static vs dynamic typed languages' },
              { id: 'p1-stack-be-3', label: 'OOP vs Functional Programming' },
              { id: 'p1-stack-be-4', label: 'Error handling' },
              { id: 'p1-stack-be-5', label: 'File system operations (fs module, streams, sync/async)' },
              { id: 'p1-stack-be-6', label: 'Event loop and async programming' },
              { id: 'p1-stack-be-7', label: 'Modules (CommonJS, ES Modules)' },
              { id: 'p1-stack-be-8', label: 'NPM and package management' },
              { id: 'p1-stack-be-9', label: 'Express.js / NestJS or equivalent frameworks' },
              { id: 'p1-stack-be-10', label: 'Middleware patterns' },
            ],
          },
          {
            id: 'p1-stack-db',
            label: 'Databases',
            items: [
              { id: 'p1-stack-db-1', label: 'Database connections and queries' },
              { id: 'p1-stack-db-2', label: 'Relational (PostgreSQL, MySQL)' },
              { id: 'p1-stack-db-3', label: 'Non-relational (MongoDB, Redis)' },
              { id: 'p1-stack-db-4', label: 'Graph / Vector databases' },
              { id: 'p1-stack-db-5', label: 'Database indexing and query optimization' },
            ],
          },
          {
            id: 'p1-stack-common',
            label: 'Common for All',
            items: [
              { id: 'p1-stack-c-1', label: 'Version control (Git, GitHub / GitLab / Bitbucket)' },
              { id: 'p1-stack-c-2', label: 'Code editor shortcuts and extensions' },
              { id: 'p1-stack-c-3', label: 'Package managers (npm, yarn, pnpm)' },
              { id: 'p1-stack-c-4', label: 'Debugging techniques and devtools' },
              { id: 'p1-stack-c-5', label: 'Arrays & Objects manipulation' },
            ],
          },
        ],
      },
      {
        id: 'p1-sysd',
        label: 'System Design Fundamentals',
        subgroups: [
          {
            id: 'p1-sysd-net',
            label: 'Networking & Communication',
            items: [
              { id: 'p1-sysd-net-1', label: 'Client-Server architecture' },
              { id: 'p1-sysd-net-2', label: 'DNS and domain names' },
              { id: 'p1-sysd-net-3', label: 'HTTP / HTTPS protocols' },
              { id: 'p1-sysd-net-4', label: 'HTTP/2 and HTTP/3' },
              { id: 'p1-sysd-net-5', label: 'TCP / UDP protocols' },
              { id: 'p1-sysd-net-6', label: 'WebSockets and SSE' },
              { id: 'p1-sysd-net-7', label: 'CORS' },
              { id: 'p1-sysd-net-8', label: 'Proxy servers (forward / reverse)' },
            ],
          },
          {
            id: 'p1-sysd-api',
            label: 'APIs & Protocols',
            items: [
              { id: 'p1-sysd-api-1', label: 'API design (REST, GraphQL, gRPC)' },
              { id: 'p1-sysd-api-2', label: 'API protocols (HTTP, gRPC)' },
              { id: 'p1-sysd-api-3', label: 'Authn & Authz (Basic, JWT, OAuth, Cookie, Bearer)' },
              { id: 'p1-sysd-api-4', label: 'Rate limiting and throttling' },
            ],
          },
          {
            id: 'p1-sysd-data',
            label: 'Data & Storage',
            items: [
              { id: 'p1-sysd-data-1', label: 'Caching strategies (Redis, Memcached, CDN)' },
              { id: 'p1-sysd-data-2', label: 'Database scaling (replication, sharding, partitioning)' },
              { id: 'p1-sysd-data-3', label: 'Message queues (RabbitMQ, Kafka, SQS)' },
            ],
          },
          {
            id: 'p1-sysd-arch',
            label: 'Architecture Patterns',
            items: [
              { id: 'p1-sysd-arch-1', label: 'Microservices vs monoliths' },
              { id: 'p1-sysd-arch-2', label: 'Load balancing (round robin, least conn, consistent hashing)' },
              { id: 'p1-sysd-arch-3', label: 'CAP theorem and consistency models' },
            ],
          },
          {
            id: 'p1-sysd-infra',
            label: 'Infrastructure & Deployment',
            items: [
              { id: 'p1-sysd-infra-1', label: 'Web servers (Nginx, Apache)' },
              { id: 'p1-sysd-infra-2', label: 'CI/CD pipelines (GH Actions, Jenkins, GitLab CI)' },
              { id: 'p1-sysd-infra-3', label: 'Monitoring & logging (errors, performance)' },
            ],
          },
        ],
      },
      {
        id: 'p1-clean',
        label: 'Clean Code & Design Patterns',
        subgroups: [
          {
            id: 'p1-clean-prin',
            label: 'Engineering Principles',
            items: [
              { id: 'p1-clean-prin-1', label: 'SOLID' },
              { id: 'p1-clean-prin-2', label: 'Single Responsibility (SRP)' },
              { id: 'p1-clean-prin-3', label: 'Open/Closed (OCP)' },
              { id: 'p1-clean-prin-4', label: 'Liskov Substitution (LSP)' },
              { id: 'p1-clean-prin-5', label: 'Interface Segregation (ISP)' },
              { id: 'p1-clean-prin-6', label: 'Dependency Inversion (DIP)' },
              { id: 'p1-clean-prin-7', label: "DRY (Don't Repeat Yourself)" },
              { id: 'p1-clean-prin-8', label: 'KISS (Keep It Simple)' },
              { id: 'p1-clean-prin-9', label: "YAGNI (You Aren't Gonna Need It)" },
              { id: 'p1-clean-prin-10', label: 'Separation of Concerns' },
            ],
          },
          {
            id: 'p1-clean-create',
            label: 'Creational Patterns',
            items: [
              { id: 'p1-clean-create-1', label: 'Factory' },
              { id: 'p1-clean-create-2', label: 'Singleton' },
              { id: 'p1-clean-create-3', label: 'Builder (optional)' },
            ],
          },
          {
            id: 'p1-clean-struct',
            label: 'Structural Patterns',
            items: [
              { id: 'p1-clean-struct-1', label: 'Proxy' },
              { id: 'p1-clean-struct-2', label: 'Facade' },
              { id: 'p1-clean-struct-3', label: 'Adapter (optional)' },
              { id: 'p1-clean-struct-4', label: 'Decorator (optional)' },
            ],
          },
          {
            id: 'p1-clean-behav',
            label: 'Behavioral Patterns',
            items: [
              { id: 'p1-clean-behav-1', label: 'Observer' },
              { id: 'p1-clean-behav-2', label: 'Iterator' },
              { id: 'p1-clean-behav-3', label: 'Strategy (optional)' },
              { id: 'p1-clean-behav-4', label: 'Command (optional)' },
            ],
          },
          {
            id: 'p1-clean-archp',
            label: 'Architectural Patterns',
            items: [
              { id: 'p1-clean-archp-1', label: 'Dependency Injection' },
              { id: 'p1-clean-archp-2', label: 'Repository pattern' },
            ],
          },
          {
            id: 'p1-clean-quality',
            label: 'Code Quality',
            items: [
              { id: 'p1-clean-quality-1', label: 'Code refactoring techniques' },
              { id: 'p1-clean-quality-2', label: 'Identifying and fixing code smells' },
            ],
          },
        ],
      },
      {
        id: 'p1-dsa',
        label: 'Data Structures & Algorithms',
        items: [
          { id: 'p1-dsa-1', label: 'Big O Notation' },
          { id: 'p1-dsa-2', label: 'Hash Tables' },
          { id: 'p1-dsa-3', label: 'Trees' },
          { id: 'p1-dsa-4', label: 'Graphs' },
          { id: 'p1-dsa-5', label: 'Sorting algorithms' },
          { id: 'p1-dsa-6', label: 'Traversing techniques' },
          { id: 'p1-dsa-7', label: 'Recursion' },
          { id: 'p1-dsa-8', label: 'Dynamic Programming' },
          { id: 'p1-dsa-9', label: 'Practice on LeetCode' },
        ],
      },
      {
        id: 'p1-test',
        label: 'Automated Testing',
        items: [
          { id: 'p1-test-1', label: 'Unit testing (Jest, Vitest, Mocha, Chai)' },
          { id: 'p1-test-2', label: 'Integration testing' },
          { id: 'p1-test-3', label: 'E2E testing (Cypress, Playwright)' },
          { id: 'p1-test-4', label: 'API testing (Postman)' },
          { id: 'p1-test-5', label: 'Performance testing (JMeter, K6)' },
          { id: 'p1-test-6', label: 'Test-driven development (TDD)' },
          { id: 'p1-test-7', label: 'Mocking and stubbing' },
          { id: 'p1-test-8', label: 'Code coverage metrics' },
          { id: 'p1-test-9', label: 'Automated testing in pipelines' },
        ],
      },
    ],
  },
  {
    id: 'p2',
    number: '02',
    label: 'Production Architecture',
    tagline: 'Scale, design, decide. Where engineers become architects.',
    categories: [
      {
        id: 'p2-scale',
        label: 'Building & Scaling Production Systems',
        items: [
          { id: 'p2-scale-1', label: 'High availability architecture' },
          { id: 'p2-scale-2', label: 'Horizontal vs vertical scaling' },
          { id: 'p2-scale-3', label: 'Auto-scaling strategies' },
          { id: 'p2-scale-4', label: 'Disaster recovery planning' },
          { id: 'p2-scale-5', label: 'Multi-region deployments' },
          { id: 'p2-scale-6', label: 'Performance optimization at scale' },
          { id: 'p2-scale-7', label: 'Database replication & sharding' },
          { id: 'p2-scale-8', label: 'Load balancers' },
          { id: 'p2-scale-9', label: 'CDNs (Content Delivery Networks)' },
          { id: 'p2-scale-10', label: 'Monorepos (Nx, Turborepo, Lerna)' },
        ],
      },
      {
        id: 'p2-decide',
        label: 'Architectural Decision Making',
        items: [
          { id: 'p2-decide-1', label: 'Trade-off analysis (perf / cost / complexity)' },
          { id: 'p2-decide-2', label: 'Identifying system bottlenecks' },
          { id: 'p2-decide-3', label: 'Single point of failure analysis' },
          { id: 'p2-decide-4', label: 'Tech stack selection criteria' },
          { id: 'p2-decide-5', label: 'Migration strategies (legacy → modern)' },
          { id: 'p2-decide-6', label: 'Capacity planning & cost estimations' },
        ],
      },
      {
        id: 'p2-design',
        label: 'Design & Blueprinting',
        items: [
          { id: 'p2-design-1', label: 'High-level architecture diagrams' },
          { id: 'p2-design-2', label: 'Low-level component design' },
          { id: 'p2-design-3', label: 'Tech design documents (TDDs)' },
          { id: 'p2-design-4', label: 'Architecture Decision Records (ADRs)' },
          { id: 'p2-design-5', label: 'Cost estimation & budgeting' },
        ],
      },
      {
        id: 'p2-micro',
        label: 'Microservices & Best Practices',
        items: [
          { id: 'p2-micro-1', label: 'Monolith vs Microservices' },
          { id: 'p2-micro-2', label: 'Event-Driven Design (EDD)' },
          { id: 'p2-micro-3', label: 'Domain-Driven Design (DDD)' },
          { id: 'p2-micro-4', label: 'API gateway patterns' },
          { id: 'p2-micro-5', label: 'Circuit breaker & retry patterns' },
          { id: 'p2-micro-6', label: 'Saga pattern (distributed transactions)' },
          { id: 'p2-micro-7', label: 'Messaging architecture (Kafka, RabbitMQ, SQS)' },
        ],
      },
      {
        id: 'p2-cloud',
        label: 'Cloud Services (AWS / Azure / GCP)',
        items: [
          { id: 'p2-cloud-1', label: 'Compute: EC2, Lambda, App Engine' },
          { id: 'p2-cloud-2', label: 'Storage: S3, Blob Storage, RDS, DynamoDB' },
          { id: 'p2-cloud-3', label: 'Networking: VPC, Load Balancers, CloudFront' },
          { id: 'p2-cloud-4', label: 'Security: IAM, Security Groups, encryption' },
          { id: 'p2-cloud-5', label: 'Monitoring: CloudWatch, Stackdriver, Azure Monitor' },
          { id: 'p2-cloud-6', label: 'IaC (Terraform, Pulumi, CloudFormation)' },
          { id: 'p2-cloud-7', label: 'Serverless architectures' },
          { id: 'p2-cloud-8', label: 'Deployment (AWS, DigitalOcean, Heroku)' },
          { id: 'p2-cloud-9', label: 'Docker containerization' },
        ],
      },
      {
        id: 'p2-perf',
        label: 'Performance Optimization',
        items: [
          { id: 'p2-perf-1', label: 'Compression (Gzip / Brotli)' },
          { id: 'p2-perf-2', label: 'Optimized and minimized code' },
          { id: 'p2-perf-3', label: 'API caching (Redis, Memcached)' },
          { id: 'p2-perf-4', label: 'Efficient rendering' },
          { id: 'p2-perf-5', label: 'Database indexing' },
        ],
      },
      {
        id: 'p2-sec',
        label: 'Security',
        items: [
          { id: 'p2-sec-1', label: 'Web security fundamentals' },
          { id: 'p2-sec-2', label: 'API security' },
          { id: 'p2-sec-3', label: 'Secure authentication and authorization' },
          { id: 'p2-sec-4', label: 'XSS (Cross-Site Scripting)' },
          { id: 'p2-sec-5', label: 'CSRF (Cross-Site Request Forgery)' },
          { id: 'p2-sec-6', label: 'SQL / NoSQL injections' },
          { id: 'p2-sec-7', label: 'Managing tokens' },
          { id: 'p2-sec-8', label: 'OAuth implementation' },
        ],
      },
      {
        id: 'p2-waf',
        label: 'Well-Architected Framework',
        items: [
          { id: 'p2-waf-1', label: 'Operational Excellence' },
          { id: 'p2-waf-2', label: 'Security' },
          { id: 'p2-waf-3', label: 'Reliability' },
          { id: 'p2-waf-4', label: 'Performance Efficiency' },
          { id: 'p2-waf-5', label: 'Cost Optimization' },
          { id: 'p2-waf-6', label: 'Sustainability' },
        ],
      },
      {
        id: 'p2-env',
        label: 'Environments & Deployment',
        items: [
          { id: 'p2-env-1', label: 'Dev, Staging, Prod environments' },
          { id: 'p2-env-2', label: 'CI/CD pipelines' },
          { id: 'p2-env-3', label: 'Automated testing in pipelines' },
        ],
      },
    ],
  },
  {
    id: 'p3',
    number: '03',
    label: 'Positioning & Interviews',
    tagline: 'The career layer — sell your work, land the role, negotiate the offer.',
    categories: [
      {
        id: 'p3-pos',
        label: 'Positioning as A-Tier Engineer',
        items: [
          { id: 'p3-pos-1', label: 'Translating technical work into business value' },
          { id: 'p3-pos-2', label: 'Framing projects with metrics & outcomes (ROI)' },
          { id: 'p3-pos-3', label: 'Stakeholder communication' },
          { id: 'p3-pos-4', label: 'Personal brand strategy as a developer' },
        ],
      },
      {
        id: 'p3-comm',
        label: 'Communication & Collaboration',
        items: [
          { id: 'p3-comm-1', label: 'Writing effective technical documentation' },
          { id: 'p3-comm-2', label: 'Presenting to non-technical audiences' },
          { id: 'p3-comm-3', label: 'Explaining trade-offs clearly' },
          { id: 'p3-comm-4', label: 'Cross-functional teamwork' },
        ],
      },
      {
        id: 'p3-resume',
        label: 'Resume, LinkedIn, Portfolio',
        items: [
          { id: 'p3-resume-1', label: 'Impact-focused resume structure' },
          { id: 'p3-resume-2', label: 'Quantifying achievements (metrics, outcomes)' },
          { id: 'p3-resume-3', label: 'LinkedIn optimization' },
          { id: 'p3-resume-4', label: 'GitHub profile' },
          { id: 'p3-resume-5', label: 'Portfolio case studies (problem → approach → solution → results)' },
          { id: 'p3-resume-6', label: 'ATS keyword optimization' },
        ],
      },
      {
        id: 'p3-int',
        label: 'Interview Excellence',
        items: [
          { id: 'p3-int-1', label: 'System design interviews (framework for any problem)' },
          { id: 'p3-int-2', label: 'Live coding interviews (communication while coding)' },
          { id: 'p3-int-3', label: 'DSA interviews' },
          { id: 'p3-int-4', label: 'Behavioral interviews' },
          { id: 'p3-int-5', label: 'Technical deep dives (explaining past projects)' },
          { id: 'p3-int-6', label: "Handling 'I don't know' gracefully" },
          { id: 'p3-int-7', label: 'Asking smart questions to interviewers' },
        ],
      },
      {
        id: 'p3-sales',
        label: 'Sales Skills for Developers',
        items: [
          { id: 'p3-sales-1', label: 'Selling your expertise in interviews' },
          { id: 'p3-sales-2', label: 'Framing work from business ROI perspective' },
          { id: 'p3-sales-3', label: 'Storytelling around past projects' },
          { id: 'p3-sales-4', label: 'Demonstrating senior-level thinking' },
        ],
      },
      {
        id: 'p3-neg',
        label: 'Salary Negotiation',
        items: [
          { id: 'p3-neg-1', label: 'Researching market rates (levels.fyi, Glassdoor)' },
          { id: 'p3-neg-2', label: 'Anchoring strategies (never give number first)' },
          { id: 'p3-neg-3', label: 'Negotiating equity, bonus, remote flexibility' },
          { id: 'p3-neg-4', label: 'Handling multiple offers' },
          { id: 'p3-neg-5', label: 'Counter-offer scripts' },
          { id: 'p3-neg-6', label: 'Recognizing low-ball vs fair offers' },
          { id: 'p3-neg-7', label: 'Walking away when needed' },
        ],
      },
    ],
  },
  {
    id: 'p4',
    number: '04',
    label: 'AI Skills',
    tagline: 'The compounding edge — bonus, not optional.',
    categories: [
      {
        id: 'p4-aidev',
        label: 'AI-Assisted Development',
        items: [
          { id: 'p4-aidev-1', label: 'GitHub Copilot workflows' },
          { id: 'p4-aidev-2', label: 'Cursor IDE setup & optimization' },
          { id: 'p4-aidev-3', label: 'Claude / ChatGPT for code reviews' },
          { id: 'p4-aidev-4', label: 'AI for debugging & error analysis' },
          { id: 'p4-aidev-5', label: 'Automated documentation generation' },
          { id: 'p4-aidev-6', label: 'Test case generation with AI' },
          { id: 'p4-aidev-7', label: '2x–10x faster development workflows' },
        ],
      },
      {
        id: 'p4-prompt',
        label: 'Prompt Engineering',
        items: [
          { id: 'p4-prompt-1', label: 'Prompt patterns for production code' },
          { id: 'p4-prompt-2', label: 'Code generation best practices' },
          { id: 'p4-prompt-3', label: 'Context management for AI tools' },
          { id: 'p4-prompt-4', label: 'Effective prompting techniques' },
        ],
      },
      {
        id: 'p4-mcp',
        label: 'MCP Servers',
        items: [
          { id: 'p4-mcp-1', label: 'Model Context Protocol (MCP) basics' },
          { id: 'p4-mcp-2', label: 'Integrating MCP into workflows' },
          { id: 'p4-mcp-3', label: 'Common MCP use cases' },
        ],
      },
      {
        id: 'p4-rag',
        label: 'RAG Systems',
        items: [
          { id: 'p4-rag-1', label: 'RAG system architecture' },
          { id: 'p4-rag-2', label: 'Vector databases (Pinecone, Weaviate, ChromaDB)' },
          { id: 'p4-rag-3', label: 'Building AI-powered search' },
          { id: 'p4-rag-4', label: 'Retrieval optimization strategies' },
        ],
      },
    ],
  },
];

// Flatten helper for counting and seeding
export function getAllItems(): RoadmapItem[] {
  const out: RoadmapItem[] = [];
  for (const pillar of ROADMAP) {
    for (const cat of pillar.categories) {
      if (cat.items) out.push(...cat.items);
      if (cat.subgroups) for (const sg of cat.subgroups) out.push(...sg.items);
    }
  }
  return out;
}
