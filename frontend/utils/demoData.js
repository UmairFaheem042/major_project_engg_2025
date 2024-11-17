const claims = [
  {
    id:1,
    name: "Claim_1",
    status: "Approved",
    beneficiary: "User_123",
    date: "17-11-2024",
    policyNumber: "000-1111-2222",
    hospitalName: "ABC Hospital",
    claimAmount: "Rs. 100000",
    issue: "Accident",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, aut ullam magnam exercitationem iusto voluptatem dicta non delectus maiores vero!",
    note: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In sint cum culpa quaerat! Illo, soluta obcaecati modi quibusdam, ea quo deleniti amet eaque vero quos numquam deserunt dolorem aperiam aspernatur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam saepe a commodi iure accusamus quia quisquam odio voluptatem itaque ea aliquam aut sapiente, voluptas sunt fugiat fugit. Atque est sunt necessitatibus error fugiat similique aut explicabo voluptatem aliquid! Ullam officiis quisquam fugit possimus voluptatum omnis officia aut animi quas dignissimos!",
  },
  {
    id:2,
    name: "Claim_2",
    status: "Rejected",
    beneficiary: "User_456",
    date: "18-11-2024",
    policyNumber: "123-2222-3333",
    hospitalName: "XYZ Hospital",
    claimAmount: "Rs. 75000",
    issue: "Illness",
    description:
      "The user was admitted for a serious illness and requires medical reimbursement.",
    note: "The claim is under review. Additional documents have been requested from the beneficiary.",
  },
  {
    id:3,
    name: "Claim_3",
    status: "Rejected",
    beneficiary: "User_789",
    date: "16-11-2024",
    policyNumber: "222-3333-4444",
    hospitalName: "MediCare Hospital",
    claimAmount: "Rs. 50000",
    issue: "Routine Checkup",
    description:
      "Claim for routine checkup which is not covered under the policy terms.",
    note: "The claim has been rejected due to policy limitations regarding routine checkups.",
  },
  {
    id:4,
    name: "Claim_4",
    status: "Approved",
    beneficiary: "User_101",
    date: "15-11-2024",
    policyNumber: "333-4444-5555",
    hospitalName: "Global Health Center",
    claimAmount: "Rs. 200000",
    issue: "Surgery",
    description:
      "The user underwent a critical surgery covered under the policy.",
    note: "All documents verified. The amount will be disbursed within 7 working days.",
  },
  {
    id:5,
    name: "Claim_5",
    status: "Rejected",
    beneficiary: "User_202",
    date: "19-11-2024",
    policyNumber: "444-5555-6666",
    hospitalName: "Apollo Hospital",
    claimAmount: "Rs. 150000",
    issue: "Accident",
    description:
      "The user suffered injuries from a major accident and requested medical reimbursement.",
    note: "Awaiting approval from the claims team. Verification of submitted bills is in progress.",
  },
];

export default claims;