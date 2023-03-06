const codes = {
    "c100": "Art",
    "c200": "Athletics",
    "c300": "Business",
    "c400": "Education",
    "c500": "Humanities",
    "c600": "Public Service / Government",
    "c700": "STEM",
    "c800": "Other",

    "s100": "General",

    "s101": "Architecture",
    "s102": "Art History",
    "s103": "Cinema",
    "s104": "Design",
    "s105": "Literature",
    "s106": "Music",
    "s107": "Painting / Drawing",
    "s108": "Sculpting",
    "s109": "Theater / Dance",

    "s201": "Competition Sports",
    "s202": "Individual Sports",
    "s203": "Team Sports",
    "s204": "Sports / Team Management",

    "s301": "CEO / Corporate Leadership",
    "s302": "Entrepreneurship",
    "s303": "Inventing / Patent Holding",

    "s401": "Early Education",
    "s402": "Higher Education",
    "s403": "Research",

    "s501": "Ancient / Modern Languages",
    "s502": "Literature",
    "s503": "Philosophy / Religion",
    "s504": "Social Reformation",

    "s601": "Activism",
    "s602": "Legal / Judicial",
    "s603": "Military",
    "s604": "Politics",

    "s701": "Astronomy",
    "s702": "Architecture",
    "s703": "Biology",
    "s704": "Chemistry",
    "s705": "Climate / Earth Sciences",
    "s706": "Computer Science",
    "s707": "Mathematics",
    "s708": "Medicine",
    "s709": "Engineering",
    "s710": "Physics",
    "s711": "Technology",

    "q101": "The nominee is a leader in their field of achievement",
    "q102": "The nominee created significant change within their field",
    "q103": "The nominee's contributions have significant and lasting impact",
    "q104": "The nominee's contributions significantly impacts/inspires others",
    "q105": "The nominee contributed to the empowerment of women and/or contributed to the empowerment of women nationally",
    "q201": "The nominee had a significant impact on their field of accomplishment",
    "q202": "The nominee's contributions inspired change, either within their field or for society as a whole",
    "q203": "The nominee's contributions created national and/or global change/impact",
    "q301": "The nominee's achievements created a change that has (or will) endure over time",
    "q302": "The nominee's achievements created and maintained historical changes for society at large",

    // nominee/nomination status
    "n100": "Created",
    "n200": "Reviewed", // Ready to be matched
    "n300": "Matched",
    "n400": "Selected",
    "n500": "Rejected",

    // matching status
    "m100": "Review",
    "m200": "Denied",
    "m300": "Matched",
    "m400": "Unmatched",

    // judge status
    "j100": "Applied",
    "j200": "Previous Judge",
    "j300": "Active", // any judge that is accepted and has no assigned matched
    "j400": "Rejected",
    "j500": "Matched",   // when a judge has a match
    // (These are going to have to me stored multiple times based on the number of nominees assigned)
    "j600": "Opened",   // when an assigned judge opens a nominee
    "j700": "In-Progress",  // when an assigned judge saves a nominee but does submit the review
    "j800": "Completed", // when an assigned judge completes 
};

export default codes;