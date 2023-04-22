USE selectionprocess;

-- Get rid of any tables that might already exist
DROP TABLE IF EXISTS ActivityLog, NominationLink, Nominees, Nominations, Matches, Users, Cohort CASCADE;

-- Create all the  tables needed
/* 
    Nominees
    Nominations
    Cohorts
    Users
    Matches
    NominationLink
    NominationSkillLink
    UserSkillLink
    ActivityLog
 */

CREATE TABLE Cohort (
    ID SERIAL PRIMARY KEY NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL
);

CREATE TABLE Users(
  ID SERIAL PRIMARY KEY NOT NULL,
  type VARCHAR(25),
  email VARCHAR(50),
  firstName VARCHAR(25),
  lastName VARCHAR(25),
  active BOOLEAN DEFAULT TRUE,
  info JSON -- could contain category, judge info (capacity, previous judge, pronouns, socials, previoud judge, conflicts), 
);

CREATE TABLE Nominations (
    ID SERIAL PRIMARY KEY NOT NULL,
    date TIMESTAMP DEFAULT NOW(),
    authorFirst VARCHAR(25) NOT NULL,
    authorLast VARCHAR(25) NOT NULL,
    authorEmail VARCHAR(50) NOT NULL,
    nomFirst VARCHAR(25) NOT NULL,
    nomLast VARCHAR(25) NOT NULL,
    nomYOB YEAR NOT NULL,
    cohort BIGINT UNSIGNED DEFAULT 4, -- todo set default to last id in cohort table
    category VARCHAR(25) NOT NULL,
    subcategory VARCHAR(25),
    subcategoryOther VARCHAR(25),
    nomQ1 VARCHAR(25),
    nomQ1Description TEXT NOT NULL,
    nomQ2 VARCHAR(25),
    nomQ2Description TEXT NOT NULL,
    nomQ3 VARCHAR(25),
    nomQ3Description TEXT NOT NULL,
    nomDeceased BOOLEAN NOT NULL,
    nomAchieved BOOLEAN NOT NULL,
    nomAdditionalInfo TEXT,
    nomStatus VARCHAR(10) DEFAULT 'n100',
    FOREIGN KEY (cohort)
        REFERENCES Cohort (ID)
        ON DELETE CASCADE
);

CREATE TABLE Nominees(
  ID SERIAL PRIMARY KEY NOT NULL,
  firstName VARCHAR(25) NOT NULL,
  lastName VARCHAR(25) NOT NULL,
  cohort BIGINT UNSIGNED DEFAULT 4,   -- todo set default to last id in cohort table
  nomStatus VARCHAR(10) DEFAULT 'n200' REFERENCES Nominations (nomStatus) ON DELETE CASCADE,
  yob YEAR NOT NULL,
  category VARCHAR(25) NOT NULL,
  subcategory VARCHAR(25),
  subcategoryOther VARCHAR(25),
  nominations JSON,  -- could contain category (duplicated nominations)
  FOREIGN KEY (cohort) 
    REFERENCES Cohort (ID)
    ON DELETE CASCADE
);

CREATE TABLE Matches (
    ID SERIAL PRIMARY KEY NOT NULL,
    nomineeID BIGINT UNSIGNED,
    judgeID BIGINT UNSIGNED,
    FOREIGN KEY (nomineeID)
        REFERENCES Users (ID)
        ON DELETE CASCADE,
    FOREIGN KEY (judgeID)
        REFERENCES Users (ID)
        ON DELETE CASCADE
);

CREATE TABLE NominationLink (
    ID SERIAL PRIMARY KEY NOT NULL,
    nominationID BIGINT UNSIGNED,
    nomineeID BIGINT UNSIGNED,
    cohortID BIGINT UNSIGNED,
    FOREIGN KEY (nominationID)
        REFERENCES Nominations (ID)
        ON DELETE CASCADE,
    FOREIGN KEY (nomineeID)
        REFERENCES Nominees (ID)
        ON DELETE CASCADE,
    FOREIGN KEY (cohortID)
        REFERENCES Cohort (ID)
        ON DELETE CASCADE
);

-- CREATE TABLE NomineeSkillLink(
--   ID SERIAL PRIMARY KEY NOT NULL,
--   nomineeID INT(25),
--   category VARCHAR(10),
--   subcategory VARCHAR(10),
--   subcategoryOther VARCHAR(10),
--   weight INT(25),
--   FOREIGN KEY(userID)
--     REFERENCES Users(ID)
--     ON DELETE CASCADE
-- );

CREATE TABLE ActivityLog (
    activityID SERIAL PRIMARY KEY NOT NULL,
    userID BIGINT UNSIGNED,
    nomineeID BIGINT UNSIGNED,
    type VARCHAR(50),
    FOREIGN KEY (userID)
        REFERENCES Users (ID)
        ON DELETE CASCADE,
    FOREIGN KEY (nomineeID)
        REFERENCES Nominees (ID)
        ON DELETE CASCADE
);
