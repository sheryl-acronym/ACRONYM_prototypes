export interface Signal {
  id: string;
  deal_id: string;
  deal_name: string;
  company_name: string;
  company_logo_url?: string;
  momentum?: 'Strong' | 'Stalled' | 'At risk' | 'Closed' | 'Active';
  conversation_snippet: string;
  speaker_name: string;
  llm_reasoning?: string;
  transcript_url?: string;
  meeting_date: string;
  meeting_time?: string;
  meeting_title: string;
  objection?: string;
  category?: 'Fit and Capability' | 'Authority' | 'Alternatives' | 'Risk and Trust' | 'Budget and Value';
  timestamp?: string;
  response_speaker_name?: string;
  response_snippet?: string;
  response_timestamp?: string;
  response_approach?: string;
  why_this_works?: string;
}

export const signalsData: Signal[] = [
  {
    id: 'signal-001',
    deal_id: 'deal-001',
    deal_name: 'GG Fitness',
    company_name: 'GG Fitness',
    company_logo_url: 'https://logo.clearbit.com/ggfitness.com',
    momentum: 'Strong',
    conversation_snippet:
      '"Does Flex handle the complexity of verifying which products actually qualify for HSA/FSA? We have thousands of SKUs and we\'re not sure how to manage that at scale."',
    speaker_name: 'Sarah Martinez',
    llm_reasoning: 'Customer expressing uncertainty about product eligibility verification process and implementation complexity.',
    transcript_url: 'https://example.com/transcript/signal-001',
    meeting_date: '2026-01-15',
    meeting_time: '14:30',
    meeting_title: 'Product demo and integration walkthrough',
    objection: 'Product Eligibility and Classification Uncertainty',
    category: 'Fit and Capability',
    timestamp: '00:19:05',
    response_speaker_name: 'Jacob Francis',
    response_snippet: 'Jacob explained that Flex intelligently handles HSA/FSA verification on a per-SKU basis, allowing customers to create rules mapping products to compliance categories. This eliminates manual tracking and scales automatically.',
    response_timestamp: '00:20:15',
    response_approach: 'Jacob directly addressed the scale concern by explaining the automated rule-mapping system. He positioned this as a feature that solves their exact problem, moving from uncertainty to confidence in a single response.',
    why_this_works: 'By acknowledging the complexity and then providing a concrete, scalable solution, Jacob validates the concern while building trust. This approach transforms a technical objection into a feature highlight.',
  },
  {
    id: 'signal-002',
    deal_id: 'deal-002',
    deal_name: 'Tricoci',
    company_name: 'Tricoci',
    company_logo_url: 'https://logo.clearbit.com/tricoci.com',
    momentum: 'Stalled',
    conversation_snippet:
      '"We\'d need legal to review this and our IT team to vet the integration. Can you walk us through the security compliance process?"',
    speaker_name: 'Mike Johnson',
    llm_reasoning: 'Prospect indicating multi-step internal approval process involving legal and IT security review.',
    transcript_url: 'https://example.com/transcript/signal-002',
    meeting_date: '2026-01-12',
    meeting_time: '10:00',
    meeting_title: 'Discovery call: Internal approval process',
    objection: 'Complex Internal Approval Process',
    category: 'Authority',
    timestamp: '00:34:22',
    response_speaker_name: 'Elena Rodriguez',
    response_snippet: 'Elena provided documentation of Flex\'s SOC 2 Type II certification, PCI-DSS compliance, and detailed the encryption protocols used for payment data. She offered to schedule a technical deep-dive with their IT team to review architecture.',
    response_timestamp: '00:35:40',
    response_approach: 'Elena provided immediate credibility through certifications, then offered to escalate to the right stakeholder (IT team). This removes friction from the approval process while demonstrating expertise.',
    why_this_works: 'When a prospect raises internal approval concerns, bridging to their technical team shows you respect their process and removes the burden from your contact. Certifications build confidence, and direct technical engagement speeds approval.',
  },
  {
    id: 'signal-003',
    deal_id: 'deal-003',
    deal_name: 'Fit52',
    company_name: 'Fit52',
    company_logo_url: 'https://logo.clearbit.com/fit52.com',
    momentum: 'At risk',
    conversation_snippet:
      '"TrueMed is positioning themselves as having lower fees. How does your pricing compare and what\'s the actual margin impact for us?"',
    speaker_name: 'Brandy Hipp',
    llm_reasoning: 'Customer comparing Flex against competing vendors and raising pricing/margin concerns.',
    transcript_url: 'https://example.com/transcript/signal-003',
    meeting_date: '2026-01-10',
    meeting_time: '15:45',
    meeting_title: 'Pricing discussion and competitive analysis',
    objection: 'Competitive Validation and Differentiation',
    category: 'Alternatives',
    timestamp: '00:52:18',
    response_speaker_name: 'Marcus Chen',
    response_snippet: 'Marcus clarified that while TrueMed has lower base fees, Flex\'s end-to-end solution eliminates separate integrations and reduces operational overhead, resulting in lower total cost of ownership. He walked through a side-by-side comparison showing Flex\'s value.',
    response_timestamp: '00:53:45',
    response_approach: 'Marcus acknowledged the price comparison but immediately reframed the conversation around total cost of ownership. He provided a concrete comparison showing the hidden costs of the competitor\'s approach.',
    why_this_works: 'When competitors win on price, shift the conversation to total value. By showing operational overhead savings and integration costs, Marcus demonstrates that Flex\'s higher upfront cost actually delivers better margins—directly addressing the prospect\'s concern.',
  },
  {
    id: 'signal-004',
    deal_id: 'deal-004',
    deal_name: 'MediCore',
    company_name: 'MediCore',
    company_logo_url: 'https://logo.clearbit.com/medicore.com',
    momentum: 'Strong',
    conversation_snippet:
      '"Can you walk us through how your system handles edge cases with dependent coverage eligibility across different HSA/FSA products?"',
    speaker_name: 'Jennifer Lee',
    llm_reasoning: 'Prospect diving deep into specific product eligibility scenarios.',
    transcript_url: 'https://example.com/transcript/signal-004',
    meeting_date: '2026-01-14',
    meeting_time: '11:00',
    meeting_title: 'Technical deep dive: Eligibility rules engine',
    objection: 'Product Eligibility and Classification Uncertainty',
    category: 'Fit and Capability',
    timestamp: '00:15:30',
    response_speaker_name: 'Jacob Francis',
    response_snippet: 'Jacob demonstrated the rules engine with a live walkthrough of dependent coverage scenarios, showing how the system automatically handles edge cases and applies complex eligibility rules.',
    response_timestamp: '00:16:45',
    response_approach: 'Instead of just explaining, Jacob showed it working in real-time, demonstrating the system\'s sophistication and ability to handle their specific use cases.',
    why_this_works: 'Showing over telling builds confidence. Live demos prove the system works and give prospects a hands-on sense of how it will work in their environment.',
  },
  {
    id: 'signal-005',
    deal_id: 'deal-005',
    deal_name: 'Wellness Plus',
    company_name: 'Wellness Plus',
    company_logo_url: 'https://logo.clearbit.com/wellnessplus.com',
    momentum: 'Active',
    conversation_snippet:
      '"Our compliance team needs to understand the audit trail and reporting capabilities. What documentation can you provide for regulatory compliance?"',
    speaker_name: 'Robert Chen',
    llm_reasoning: 'Prospect raising compliance and documentation concerns.',
    transcript_url: 'https://example.com/transcript/signal-005',
    meeting_date: '2026-01-13',
    meeting_time: '13:00',
    meeting_title: 'Compliance and audit requirements review',
    objection: 'Complex Internal Approval Process',
    category: 'Authority',
    timestamp: '00:28:45',
    response_speaker_name: 'Elena Rodriguez',
    response_snippet: 'Elena sent comprehensive documentation including audit trail samples, compliance certificates, and regulatory reports. She also arranged a call with their compliance team.',
    response_timestamp: '00:30:00',
    response_approach: 'Elena moved quickly to address concerns by providing documentation and facilitating direct communication with the compliance team, removing barriers to approval.',
    why_this_works: 'Fast turnaround on documentation and direct stakeholder engagement shows you understand the approval process and can move with their timeline.',
  },
  {
    id: 'signal-006',
    deal_id: 'deal-006',
    deal_name: 'Premier Health',
    company_name: 'Premier Health',
    company_logo_url: 'https://logo.clearbit.com/premierhealth.com',
    momentum: 'Stalled',
    conversation_snippet:
      '"We\'re impressed with Flex, but we\'re still evaluating a couple of other platforms. What makes you the best choice for our use case?"',
    speaker_name: 'David Thompson',
    llm_reasoning: 'Prospect in evaluation phase comparing multiple vendors.',
    transcript_url: 'https://example.com/transcript/signal-006',
    meeting_date: '2026-01-08',
    meeting_time: '09:30',
    meeting_title: 'Competitive positioning discussion',
    objection: 'Competitive Validation and Differentiation',
    category: 'Alternatives',
    timestamp: '00:41:20',
    response_speaker_name: 'Marcus Chen',
    response_snippet: 'Marcus acknowledged their evaluation process and highlighted Flex\'s specific advantages: 4x faster implementation, integrated compliance, and customer success support included. He provided case studies from similar organizations.',
    response_timestamp: '00:42:50',
    response_approach: 'Rather than dismissing competitors, Marcus owned the comparison by highlighting concrete differentiators backed by case studies and customer results.',
    why_this_works: 'Confidence in your differentiation plus social proof from similar customers accelerates the buying decision and shifts from feature parity to value delivery.',
  },
];
