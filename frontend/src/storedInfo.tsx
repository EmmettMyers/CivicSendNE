
/*
    INFORMATION THAT IS EITHER HAND-WRITTEN OR COULD NOT BE SCRAPED CORRECTLY IS STORED HERE
*/

import { getUser } from "./authenticator";
var user = getUser();
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

// Stored Letter Start
export const letterStart =
    user.firstName + " " + user.lastName + "<br>" + 
    user.address.line1 + "<br>" + 
    user.address.city + ", " + user.address.state + " " + user.address.zip + "<br>" + 
    user.email + "<br>" + 
    formattedDate  + "<br><br>" +
    "{{firstName}} {{lastName}} &nbsp;" + "<br>" + 
    "<span class='inter text-blue-700 font-bold'>{{address}}</span>" + "<br>" + 
    "<span class='inter text-blue-700 font-bold'>{{city}}</span>, NE" +
    "<span class='inter text-blue-700 font-bold'> {{zip}}</span>" + "<br><br>";

// Stored Email End
export const emailEnd = user.address.city + ", NE" + "<br />" + user.email;

// Stored info for Expressing Concerns Template
export const concernsTemplate = {
    subject: "Urgent Action Needed to Address [Issue]",
    content: `
        <p>Dear Senator {{lastName}},<br/><br/></p>
        <p>
            I am writing to express my deep concern about the [issue] that is
            affecting our community/state/country. This issue has significant
            implications for [relevant stakeholders] and requires immediate
            attention from our elected representatives.<br/><br/>
        </p>
        <p>
            [Provide a brief overview of the issue, its impact, and any supporting
            evidence or personal anecdotes.]<br/><br/>
        </p>
        <p>
            I urge you to take swift action to address this matter by [specific
            action or policy suggestion]. It is crucial that we work together to
            find a solution that upholds the values and interests of our
            constituents.<br/><br/>
        </p>
        <p>
            Thank you for your attention to this matter. I look forward to your
            prompt response and actions on this important issue.<br/><br/>
        </p>
        <p>
            Sincerely, <br />
        </p>
    `,
};
  
// Stored info for Asking for Support Template
export const supportTemplate = {
    subject: "Request for Support: [Cause Name]",
    content: `
        <p>Dear Senator {{lastName}},<br/><br/></p>
        <p>
            I hope this email finds you well. I am writing to request your support
            for an important cause that is close to my heart — [Cause Name]. As a
            dedicated public servant, your advocacy and influence can make a
            significant impact in advancing this cause and bringing about positive
            change.<br/><br/>
        </p>
        <p>
            [Provide a brief background and context about the cause, including its
            significance and the positive outcomes it aims to achieve. Highlight
            any relevant statistics, stories, or compelling arguments that
            demonstrate the importance of supporting this cause.]<br/><br/>
        </p>
        <p>
            I firmly believe that with your voice and leadership, we can drive the
            necessary attention and resources towards this cause, ensuring a
            brighter future for our community/state/country. By joining our cause,
            you will not only have the opportunity to make a lasting difference in
            the lives of countless individuals but also demonstrate your unwavering
            commitment to the well-being of your constituents.<br/><br/>
        </p>
        <p>
            I kindly request your support through [specific action you are
            requesting, such as signing a petition, sponsoring related legislation,
            or attending an event]. Your involvement will be invaluable in raising
            awareness, mobilizing support, and ultimately achieving our shared
            goals.<br/><br/>
        </p>
        <p>
            Thank you for considering this request. I greatly appreciate your
            dedication to public service and your ongoing commitment to the
            welfare of our community/state/country.<br/><br/>
        </p>
        <p>
            Best regards, <br />
        </p>
    `,
};

// Stored info for Requesting Action Template
export const actionTemplate = {
    subject: "Request for Support on [Issue]",
    content: `
        <p>Dear Senator {{lastName}},<br/><br/></p>
        <p>
            I hope this message finds you well. I am writing to request your
            support on the matter of [issue]. The impact of this issue is of great
            concern to me and many members of our community/state/country, and I
            believe it is a matter that requires your urgent attention.<br/><br/>
        </p>
        <p>
            [Clearly outline the issue, its significance, and the specific action
            or policy change you are advocating for. Provide any relevant facts,
            data, or personal stories that can further support your case.]<br/><br/>
        </p>
        <p>
            I kindly ask for your assistance in championing this cause and taking
            appropriate action to address the concerns raised. Together, we can
            work towards creating a better future for our constituents and ensuring
            the well-being of our community.<br/><br/>
        </p>
        <p>
            Thank you for your time and consideration. I look forward to your
            response and any steps you can take to support this important issue.<br/><br/>
        </p>
        <p>
            Warm regards, <br />
        </p>
    `,
};
  
// Stored info for Advocating Legislation Template
export const advocateTemplate = {
    subject: "Support Needed for [Bill Name/Number]",
    content: `
        <p>Dear Senator {{lastName}},<br/><br/></p>
        <p>
            I am writing to express my strong support for [Bill Name/Number],
            which addresses the critical issue of [topic]. This bill represents
            an important opportunity to enact positive change and improve the
            lives of individuals and communities across our nation.<br/><br/>
        </p>
        <p>
            [Explain the key provisions of the bill and how it will positively
            impact constituents. Provide any relevant statistics, expert opinions,
            or personal stories that demonstrate the need for this legislation.]<br/><br/>
        </p>
        <p>
            I respectfully request your support for this crucial bill. By adding
            your name to the list of sponsors/co-sponsors and actively advocating
            for its passage, you can contribute significantly to the well-being of
            our community/state/country.<br/><br/>
        </p>
        <p>
            Thank you for your attention to this matter. I greatly appreciate your
            consideration and support for [Bill Name/Number].<br/><br/>
        </p>
        <p>
            Best regards, <br />
        </p>
    `,
};
  
// Stored info for Opposing Legislation Template
export const opposeTemplate = {
    subject: "Strong Opposition to [Bill Name/Number]",
    content: `
        <p>Dear Senator {{lastName}},<br/><br/></p>
        <p>
            I am writing to express my strong opposition to [Bill Name/Number],
            which addresses the issue of [topic]. After carefully reviewing the
            proposed legislation, I believe it poses significant concerns and
            potential negative consequences for our community/state/country.<br/><br/>
        </p>
        <p>
            [Clearly outline the specific provisions or aspects of the bill that
            you find problematic and the reasons behind your opposition. Provide
            any supporting evidence, expert opinions, or personal experiences that
            illustrate the potential adverse impacts.]<br/><br/>
        </p>
        <p>
            It is essential to consider alternative approaches that strike a
            better balance between [desired outcome] and [potential negative
            consequences]. I strongly urge you to vote against this bill and
            explore more comprehensive, fair, and effective solutions that will
            truly serve the best interests of our constituents.<br/><br/>
        </p>
        <p>
            Thank you for your attention to this matter. I trust that you will
            carefully consider the concerns raised by your constituents and
            prioritize their well-being when making your decision.<br/><br/>
        </p>
        <p>
            Sincerely, <br />
        </p>
    `,
};

// Stored info for Appreciation and Feedback Template
export const appreciationTemplate = {
    subject: "Thank You for Your Service and Request for Feedback",
    content: `
        <p>Dear Senator {{lastName}},<br/><br/></p>
        <p>
            I would like to take a moment to express my gratitude for your
            dedicated service as our representative in the Senate. Your commitment
            to our community/state/country and the tireless efforts you have
            displayed are commendable.<br/><br/>
        </p>
        <p>
            [Express specific instances or actions taken by the senator that you
            appreciate and how they have positively impacted your life or
            community.]<br/><br/>
        </p>
        <p>
            Furthermore, I would like to offer my feedback and input on [specific
            issue or legislation]. As a concerned constituent, I believe that our
            collective voices and perspectives are essential in shaping policies
            and decisions that affect us all. I kindly request an opportunity to
            discuss this matter with you or a member of your staff.<br/><br/>
        </p>
        <p>
            Thank you once again for your exceptional service. I look forward to
            hearing from you and the chance to provide my feedback.<br/><br/>
        </p>
        <p>
            Sincerely, <br />
        </p>
    `,
};

// Stored values for state representatives
export const storedReps: Representative[] = [
    {
        firstName: "Mike",
        lastName: "Flood",
        district: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Mike_Flood_117th_Congress.jpeg",
        email: "-----",
        room: "343 Cannon HOB",
    },
    {
        firstName: "Don",
        lastName: "Bacon",
        district: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Don_Bacon_117th_Congress.jpg/1200px-Don_Bacon_117th_Congress.jpg",
        email: "-----",
        room: "2104 Rayburn HOB",
    },
    {
        firstName: "Adrian",
        lastName: "Smith",
        district: 3,
        image: "https://clerk.house.gov/content/assets/img/members/S001172.jpg",
        email: "-----",
        room: "502 Cannon HOB",
    },
];

// Stored values for state senators
export const storedStateSens: Representative[] = [
    {
        firstName: "Deb",
        lastName: "Fischer",
        district: 0,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Deb_Fischer%2C_official_portrait%2C_115th_Congress.jpg",
        email: "-----",
        room: "454 Russell Senate Office Building",
    },
    {
        firstName: "Pete",
        lastName: "Ricketts",
        district: 0,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Sen._Pete_Ricketts_official_portrait%2C_118th_Congress.jpg/1200px-Sen._Pete_Ricketts_official_portrait%2C_118th_Congress.jpg",
        email: "-----",
        room: "139 Russell Senate Office Building",
    },
];