"use client";

import Navbar from "@/components/navbar";
import Markdown from "react-markdown";

const PRIVACY_POLICY = `
# Privacy Policy Agreement
**Effective Date: July 18, 2025**

## 1. INTRODUCTION
This Privacy Policy ("Policy") governs the collection, use, storage, and disclosure of information obtained from users ("Users") of brewbot.xyz services, including our web application and Discord bot. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Policy. If you identify any misrepresentations or inaccuracies in this Policy, please promptly notify us at contact@brewbot.xyz.

## 2. INFORMATION COLLECTION
We collect and process the following categories of data:

**2.1. Unique Identifiers:** User IDs, Guild IDs, Channel IDs, Role IDs, and Message IDs;

**2.2. Redundant Data:** Guild invitations for ease of access;

**2.3. Command Arguments:** Information provided as arguments when executing commands, including any user-supplied data;

**2.4. Historical Data:** Last deleted message content (maximum of twenty-five (25) entries, retained for no more than two (2) hours) and message edit history (maximum of twenty-five (25) entries, retained for no more than two (2) hours);

**2.5. Music Integration Data:** Last.fm User IDs, usernames, and session keys;

**2.6. Technical Data:** Error logs derived from failed command execution data.

## 3. PURPOSE OF DATA COLLECTION AND PROCESSING
**3.1.** We collect and process User data solely for legitimate operational purposes, including:

a) Facilitating command execution and core service functionality;

b) Providing unique identification for users and their related data;

c) Enabling guild invitation storage for improved user experience;

d) Supporting "snipe" commands through temporary message history retention;

e) Delivering Last.fm integration and scrobble data functionality;

f) System debugging, error resolution, and technical maintenance.

**3.2.** All data collected is maintained in accordance with the retention periods specified in Section 2 or as required for ongoing service operation.

## 4. DATA STORAGE AND SECURITY
**4.1.** User data is stored in a private PostgreSQL database hosted on Railway infrastructure.

**4.2.** Database access is restricted exclusively to our two (2) authorized developers.

**4.3.** We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.

## 5. THIRD-PARTY DISCLOSURE
**5.1.** We do not sell, trade, rent, or otherwise transfer User information to external parties, with the following exception:

**5.2.** Last.fm Integration: We provide users' Last.fm User IDs and session keys along with any relevant command arguments to Last.fm's API services to provide music integration functionality, as well as displaying Last.fm usernames in command responses.

**5.3.** We reserve the right to disclose information as required by law or to comply with legal processes.

## 6. DATA RETENTION
**6.1.** Most user data is retained indefinitely or as long as required for the service to operate effectively.

**6.2.** User-supplied data obtained from command arguments changes frequently and no historical data is retained.

**6.3.** Historical message data (deleted/edited messages) is automatically purged after two (2) hours as specified in Section 2.4.

## 7. DATA SUBJECT RIGHTS
**7.1. Right to Erasure:** Users may request deletion of their personal data by:

a) Submitting a written request to contact@brewbot.xyz; or

b) Contacting our support team via Discord at discord.gg/brew

**7.2. Right to Access:** Users may request access to all data currently stored about them using the same contact methods listed above.

**7.3.** Requests will be processed within a reasonable timeframe, typically within fourteen (14) days of receipt.

## 8. AGE RESTRICTIONS
**8.1.** Our services are restricted to users aged thirteen (13) years and older, in compliance with Discord's Terms of Service.

**8.2.** We do not knowingly collect personal information from children under 13 years of age.

## 9. POLICY AMENDMENTS
**9.1.** We reserve the right to modify, amend, or update this Policy at any time.

**9.2.** Continued use of our services following any modifications constitutes acceptance of such changes.

**9.3.** Violations of our Terms of Service, including this Privacy Policy, may result in permanent termination of access to all services we provide.

## 10. CONTACT INFORMATION
For questions or concerns regarding this Privacy Policy, please contact us at:

**Email:** contact@brewbot.xyz  
**Discord:** discord.gg/brew  
**Website:** brewbot.xyz
`;

export default function PrivacyPolicy() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center antialiased">
      <Navbar />
      <div className="mb-16 flex md:pt-32 max-w-4xl flex-col gap-3 bg-background p-4">
        <div className="prose prose-invert max-w-none">
          <Markdown>{PRIVACY_POLICY}</Markdown>
        </div>
      </div>
    </div>
  );
}
