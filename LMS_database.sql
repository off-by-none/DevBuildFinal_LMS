DROP DATABASE IF EXISTS LMS
GO

CREATE DATABASE LMS
GO

USE LMS
GO

CREATE TABLE UserTable (
	userId int identity(1,1) primary key not null,
	userTypeId int not null,
	userName varchar(64)
);
GO

INSERT INTO UserTable
(userTypeId, userName)
VALUES 
(1, 'Master'), 
(2, 'Peter'),
(3, 'Brandon'),
(3, 'Soc'),
(3, 'O');
GO


CREATE TABLE UserTypeDIM (
	userTypeId int not null,
	userType varchar(16) not null
);
GO

INSERT INTO UserTypeDIM 
(userTypeId, userType)
VALUES 
(1, 'Admin'), 
(2, 'Teacher'),
(3, 'Student');
GO


CREATE TABLE Course (
	courseId int identity(1,1) primary key not null,
	courseName varchar(128) not null,
	assignedTeacherId int foreign key references UserTable(userId)
);
GO

INSERT INTO Course 
(courseName, assignedTeacherId)
VALUES 
('DevBuild3.0', 2)
GO


CREATE TABLE StudentCourse (
	courseId int foreign key references Course(courseId),
	studentId int foreign key references UserTable(userId)
);
GO

INSERT INTO StudentCourse
(courseId, studentId)
VALUES 
(1, 3),
(1, 4)
GO

CREATE TABLE Module (
	moduleID int identity(1,1) primary key not null,
	moduleName varchar(128) not null,
	courseId int foreign key references Course(courseId)
);
GO

INSERT INTO Module
(moduleName, courseId)
VALUES
('Module 1', 1),
('Module 2', 1)