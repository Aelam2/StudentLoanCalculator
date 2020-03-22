IF EXISTS (
		SELECT name
		FROM master.sys.databases
		WHERE name = N'LoanCalculator'
		)
	DROP DATABASE LoanCalculator
GO

CREATE DATABASE LoanCalculator
GO

CREATE TABLE Users (
	UserID INT IDENTITY(1, 1) PRIMARY KEY
	,UserName VARCHAR(25) NOT NULL
	,Password VARCHAR(50) NOT NULL
	,FirstName VARCHAR(255)
	,LastName VARCHAR(255)
	,Email VARCHAR(255) NOT NULL
	,LastLogin DATETIME2(7) NOT NULL
	,DateCreated DATETIME2(7) NOT NULL
	)

CREATE TABLE StudentLoans (
	LoanID INT IDENTITY(1, 1) PRIMARY KEY
	,LoanName VARCHAR(50) NOT NULL
	,UserID INT REFERENCES Users(UserID) NOT NULL
	,PaymentStart DATE NOT NULL
	,LoanTerm INT NOT NULL
	,StartingPrinciple MONEY NOT NULL
	,CurrentPrinciple MONEY NOT NULL
	,AccruedInterest MONEY NOT NULL
	,InterestRate DECIMAL(18, 2) NOT NULL
	,MinimumPayment MONEY NOT NULL
	,StatusID INT NOT NULL
	,ISDeleted BIT NOT NULL
	)

CREATE TABLE PaymentPlan (
	PaymentPlanID INT IDENTITY(1, 1) PRIMARY KEY
	,UserID INT REFERENCES Users(UserID) NOT NULL
	,PlanName VARCHAR(50) NOT NULL
	,IsCurrent BIT NOT NULL
	)

CREATE TABLE Payment (
	PaymentID INT IDENTITY(1, 1) PRIMARY KEY
	,PaymentPlanID INT REFERENCES PaymentPlan(PaymentPlanID) NOT NULL
	,PaymentDate DATE NOT NULL
	,PaymentAmount MONEY NOT NULL
	,AllocationMethodID INT NOT NULL
	,IsRecurring BIT NOT NULL
	,IsDeleted BIT NOT NULL
	)

CREATE TABLE CodeSet (
	CodeSetID INT IDENTITY(1, 1) PRIMARY KEY 
	,CodeSetName VarChar(50) NOT NULL
	,CodeSetDescription VarChar(255) NOT NULL
	,CodeValueID uniqueidentifier NOT NULL DEFAULT NEWID()
	,CodeValueName VarChar(50) NOT NULL 
	,CodeValueDescription VarChar(255) NOT NULL
)