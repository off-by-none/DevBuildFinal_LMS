CREATE DATABASE LMS
GO

USE LMS
GO

CREATE TABLE Users (
	userId int identity(1,1) primary key not null,
	userTypeId int not null,
	userName varchar(64)
);
GO

INSERT INTO Users 
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


CREATE TABLE Courses (
	courseId int identity(1,1) primary key not null,
	courseName varchar(128) not null,
	assignedTeacherId int foreign key references Users(userId)
);
GO

INSERT INTO Courses 
(courseName, assignedTeacherId)
VALUES 
('DevBuild3.0', 2)
GO


CREATE TABLE StudentCourses (
	courseId int foreign key references Courses(courseId),
	studentId int foreign key references Users(userId)
);
GO

INSERT INTO StudentCourses 
(courseId, studentId)
VALUES 
(1, 3),
(1, 4)
GO