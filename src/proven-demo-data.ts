import { PreCallBriefData } from './types';

export const provenDemoData: PreCallBriefData = {
  breadcrumb: ['Meetings', 'PROVEN <> Flex'],
  meeting_type: {
    label: 'Deal with proven.com',
    color: 'bg-green-400',
  },
  title: 'PROVEN <> Flex',
  join_button_label: 'Join & Start',
  deal_id: 'deal-005',
  metadata: {
    company: {
      name: 'PROVEN Skincare',
      logo_url: '/proven.png',
    },
    customer_profile: 'Mid-Market E-Commerce Growth Brands',
    date_time: 'April 2, 2025, 5:00 - 6:00 PM ET',
    our_team: [
      {
        name: 'Jacob Francis',
        role: 'Account Executive',
        avatar_color: 'bg-emerald-600',
      },
    ],
    their_team: [
      {
        name: 'Russell Harris',
        role: 'Technical Founder/Decision Maker',
        avatar_color: 'bg-blue-500',
      },
    ],
  },
  brief: {
    meeting_objectives: {
      description: 'First meeting with PROVEN Skincare - referral via Skio.',
      objectives: [
        'Assess HSA/FSA familiarity and determine their current capabilities',
        'Validate technical stack and platform compatibility with our integration',
        'Understand their business model and revenue mix (subscription vs. one-time)',
        'Qualify their volume and financial metrics against our thresholds',
      ],
      what_we_need_to_learn: [
        'HSA/FSA familiarity and current capabilities',
        'Technical stack and platform compatibility',
        'Business model and revenue mix (subscription vs. one-time)',
        'Volume and financial qualification',
      ],
    },
    who_youre_talking_to: {
      company: {
        name: 'PROVEN Skincare',
        icon_color: 'bg-blue-500',
        logo_url: '/proven.png',
        domain: 'proven.com',
        customer_profile: 'Mid-Market E-Commerce Growth Brands',
        deal_summary: 'PROVEN is a $35M+ AI-powered skincare company pivoting to profitability. They\'re stuck at current AOV and need high-margin revenue — HSA/FSA could unlock 15-20% uplift. Russell\'s championing internally, but unit economics has to work with their margin structure.',
        company_research: [
          'AI-powered personalized care manufacturer, >$35M run rate',
          'What they need: Strategies to increase Average Order Value (AOV) and conversion rates',
          'Timeline: Strategic pivot to profitability drives urgency for high-margin revenue',
        ],
        company_profile_url: '/company/proven-skincare',
        bullets: [
          'AI-powered personalized care manufacturer, >$35M run rate',
          'What they need: Strategies to increase Average Order Value (AOV) and conversion rates',
          'Timeline: Strategic pivot to profitability drives urgency for high-margin revenue',
        ],
      },
      attendees: [
        {
          name: 'Russell Harris',
          role: 'Head of Product/Tech',
          avatar_color: 'bg-blue-500',
          buyer_persona: 'Technical Founder/Decision Maker',
          bio: [
            "Leads product/tech; previously VP Product at Harry's and Carvana",
            'Scaled businesses from $0 to $100M+; experienced with AI lifecycles',
          ],
          approach: 'Engage on API-first architecture and impact on unit economics',
          linkedin_url: 'linkedin.com/handle',
        },
      ],
    },
    suggested_discovery_questions: [
      'What checkout or e-commerce platform do you use?',
      'What\'s your average order value?',
      'What\'s your annual revenue/sales volume?',
      'What\'s your revenue mix between subscription and one-time purchases?',
      'How familiar are you with HSA and FSA accounts?',
    ],
  },
  gameplan: {
    meeting_objective: 'Validate the ROI model against the Shopify Payments baseline, demonstrate the \'hidden SKU\' checkout flow, and define the implementation timeline to advance to a decision.',
    agenda: [],
    sections: [
      {
        title: 'Review ROI & Unit Economics',
        questions: [
          {
            text: 'What is your current checkout conversion rate on Shopify, so we can plug that baseline into the ROI model?',
            isAI: true,
          },
          {
            text: 'Is there a specific net margin percentage you need to see to approve this over Shopify Payments?',
            isAI: true,
          },
        ],
      },
      {
        title: 'Review Checkout UX & Technical Implementation',
        questions: [
          {
            text: 'How do you currently manage the workflow for establishing medical necessity, such as collecting prescriptions or issuing Letters of Medical Necessity, within your customer\'s purchase journey?',
            isAI: false,
          },
          {
            text: 'How does the \'hidden SKU\' architecture currently handle inventory syncing, and do you foresee any conflicts with the flow we just viewed?',
            isAI: true,
          },
        ],
      },
      {
        title: 'Determine implementation timeline and commercials',
        questions: [
          {
            text: 'What are your preferences or requirements regarding contract duration, billing frequency, and payment structure?',
            isAI: false,
          },
          {
            text: 'Once the ROI is approved, what does your internal legal and security review process look like?',
            isAI: true,
          },
        ],
      },
    ],
    anticipated_questions: [
      {
        text: 'How does the solution integrate with Shopify (technical implementation, operational workflows, fees)?',
        isAI: true,
      },
      {
        text: 'What does implementation involve and how long to go live?',
        isAI: true,
      },
      {
        text: 'How does financial settlement work and what\'s the payout timeline?',
        isAI: true,
      },
    ],
    anticipated_objections: [
      {
        text: 'Transaction fees (% and fixed) are too high relative to margins and current processing rates.',
        isAI: true,
      },
      {
        text: 'How does the technical integration work with our platform (Shopify, custom API, marketplace), and does it create friction or extra fees?',
        isAI: true,
      },
      {
        text: 'Concern that checkout integration will add friction, disrupt data tracking, or fail to handle split payments and discounts.',
        isAI: true,
      },
    ],
  },
};

export const provenDemoDataCall2: PreCallBriefData = {
  breadcrumb: ['Meetings', 'PROVEN <> Flex'],
  meeting_type: {
    label: 'Deal with proven.com',
    color: 'bg-green-400',
  },
  title: 'PROVEN <> Flex - Call 2',
  join_button_label: 'Join & Start',
  deal_id: 'deal-005',
  metadata: {
    company: {
      name: 'PROVEN Skincare',
      logo_url: '/proven.png',
    },
    customer_profile: 'Mid-Market E-Commerce Growth Brands',
    date_time: 'April 9, 2025, 3:00 - 4:00 PM ET',
    our_team: [
      {
        name: 'Jacob Francis',
        role: 'Account Executive',
        avatar_color: 'bg-emerald-600',
      },
    ],
    their_team: [
      {
        name: 'Russell Harris',
        role: 'Technical Founder/Decision Maker',
        avatar_color: 'bg-blue-500',
      },
    ],
  },
  brief: {
    meeting_objectives: {
      description: 'Follow-up "Demo & Pricing Review" with PROVEN Skincare and introduction to new stakeholders. Last call validated $15M ARR and 95% product eligibility; strong momentum with Russell acting as self-champion but need to prove unit economics.',
      objectives: [
        'Deepen solution fit (validate workflows, stakeholders, and edge cases)',
        'Quantify business impact (tie key capabilities to clear outcomes)',
        '✨ Address "Unit Economics" risk: Prove conversion lift outweighs Shopify Payments fees',
        '✨ Demonstrate "doctors appointment" UX to satisfy "Hidden SKU" requirements',
      ],
      what_we_need_to_learn: [
        'Technical validation: Confirm "Hidden SKU" handling meets Yuliia\'s QA standards',
        'Success criteria: Specific margin hurdle rate required for approval',
        'Brand alignment: Ensure checkout flow meets Theresa\'s premium standards',
        'Timeline: Implementation target date or urgency drivers beyond "immediate interest"',
      ],
    },
    who_youre_talking_to: {
      company: {
        name: 'PROVEN Skincare',
        icon_color: 'bg-blue-500',
        customer_profile: 'Mid-Market E-Commerce Growth Brands',
        bullets: [
          'AI-powered personalized care manufacturer utilizing data from 19M assessments',
          'What they need: Unlock HSA/FSA spending to increase conversion and AOV on ~$15M ARR',
          'Timeline: Immediate interest in "conversion lift" revenue to offset fees; fast-moving evaluation',
        ],
      },
      attendees: [
        {
          name: 'Russell Harris',
          role: 'Head of Product/Tech',
          avatar_color: 'bg-blue-500',
          buyer_persona: 'Technical Founder/Decision Maker',
          bio: [
            'Stance: Champion (Self-championing)',
            'Context: Focused on unit economics; strictly comparing Flex fees vs. current Shopify Payments',
            'Approach: Lead with ROI model proving net positive margin (Lift > Fees)',
          ],
          linkedin_url: 'linkedin.com/handle',
        },
        {
          name: 'Theresa Bischof',
          role: 'Senior Brand Lead',
          avatar_color: 'bg-purple-500',
          buyer_persona: 'Operations/Implementation Manager',
          bio: [
            'Stance: Unknown',
            'Context: Extensive brand marketing background (Disney/Marvel); likely focuses on customer journey',
            'Approach: Validate that the "doctors appointment" checkout UX meets premium brand standards',
          ],
          linkedin_url: 'linkedin.com/handle',
        },
        {
          name: 'Yuliia Pyrohova',
          role: 'Senior Technical Project Manager',
          avatar_color: 'bg-pink-500',
          buyer_persona: 'Technical Implementation Lead',
          bio: [
            'Stance: Unknown',
            'Context: QA/Testing background; likely evaluating the "Hidden SKU" integration stability',
            'Approach: Proactively address integration robustness and testing protocols',
          ],
          linkedin_url: 'linkedin.com/handle',
        },
      ],
    },
    suggested_discovery_questions: [
      'Who else needs to be involved in this decision besides Russell?',
      'What is your internal approval process and timeline?',
      'What are the key success metrics you want to achieve with HSA/FSA processing?',
      'Are there any compliance or regulatory concerns we should address?',
    ],
  },
  gameplan: {
    meeting_objective: 'Walk through technical implementation roadmap, address ROI concerns, and establish a clear path to contract signature.',
    agenda: [],
    sections: [],
    anticipated_questions: [
      {
        text: 'What does the implementation timeline look like for our catalog size?',
        isAI: true,
      },
      {
        text: 'How do we handle the transition from Shopify Payments to Flex?',
        isAI: true,
      },
      {
        text: 'What support will we get during the implementation process?',
        isAI: true,
      },
    ],
    anticipated_objections: [
      {
        text: 'Implementation timeline is too aggressive for our team capacity.',
        isAI: true,
      },
      {
        text: 'Need more time to evaluate internally before committing.',
        isAI: true,
      },
      {
        text: 'Want to pilot with a subset of products before full rollout.',
        isAI: true,
      },
    ],
  },
};
