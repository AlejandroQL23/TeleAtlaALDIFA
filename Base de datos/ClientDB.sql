USE [master]
GO
/****** Object:  Database [AldifaSoftClient]    Script Date: 22/7/2021 09:39:44 ******/
CREATE DATABASE [AldifaSoftClient]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AldifaSoftClient', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\AldifaSoftClient.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 10%)
 LOG ON 
( NAME = N'AldifaSoftClient_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\AldifaSoftClient_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [AldifaSoftClient] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AldifaSoftClient].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AldifaSoftClient] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET ARITHABORT OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AldifaSoftClient] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AldifaSoftClient] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET  DISABLE_BROKER 
GO
ALTER DATABASE [AldifaSoftClient] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AldifaSoftClient] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [AldifaSoftClient] SET  MULTI_USER 
GO
ALTER DATABASE [AldifaSoftClient] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AldifaSoftClient] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AldifaSoftClient] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AldifaSoftClient] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [AldifaSoftClient] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [AldifaSoftClient] SET QUERY_STORE = OFF
GO
USE [AldifaSoftClient]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [AldifaSoftClient]
GO
/****** Object:  Table [dbo].[Client]    Script Date: 22/7/2021 09:39:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Client](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NULL,
	[FirstSurName] [nvarchar](20) NULL,
	[SecondSurName] [nvarchar](20) NULL,
	[Address] [nvarchar](100) NULL,
	[Phone] [nvarchar](20) NULL,
	[SecondContact] [nvarchar](70) NULL,
	[Email] [nvarchar](70) NULL,
	[Password] [nvarchar](max) NULL,
	[CreationDate] [date] NULL,
	[CreationUser] [nvarchar](20) NULL,
	[UpdateDate] [date] NULL,
	[UpdateUser] [nvarchar](20) NULL,
 CONSTRAINT [PK_Client] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientService]    Script Date: 22/7/2021 09:39:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientService](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdClient] [int] NULL,
	[IdService] [int] NULL,
 CONSTRAINT [PK_ClientService] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 22/7/2021 09:39:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[CommentTimeStamp] [datetime] NULL,
	[CreationDate] [date] NULL,
	[CreationUser] [nvarchar](20) NULL,
	[UpdateDate] [date] NULL,
	[UpdateUser] [nvarchar](20) NULL,
	[IdIssue] [int] NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Issue]    Script Date: 22/7/2021 09:39:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Issue](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[RegisterTimeStamp] [datetime] NULL,
	[Address] [nvarchar](100) NULL,
	[ContactPhone] [nvarchar](20) NULL,
	[ContactEmail] [nvarchar](70) NULL,
	[Status] [nchar](15) NULL,
	[SupportUserAssigned] [nvarchar](20) NULL,
	[IdClient] [int] NULL,
	[ResolutionComment] [nvarchar](max) NULL,
	[CreationDate] [date] NULL,
	[CreationUser] [nvarchar](20) NULL,
	[UpdateDate] [date] NULL,
	[UpdateUser] [nvarchar](20) NULL,
	[IdService] [int] NULL,
 CONSTRAINT [PK_Issue] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Service]    Script Date: 22/7/2021 09:39:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Service](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NULL,
	[CreationDate] [date] NULL,
	[CreationUser] [nvarchar](20) NULL,
	[UpdateDate] [date] NULL,
	[UpdateUser] [nvarchar](20) NULL,
 CONSTRAINT [PK_Service] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Client] ON 

INSERT [dbo].[Client] ([Id], [Name], [FirstSurName], [SecondSurName], [Address], [Phone], [SecondContact], [Email], [Password], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (8, N'Ariana', N'Grande', N'Butera', N'Florida', N'87967855', N'22562222', N'ariana20@gmail.com', N'ro61KdwjUR4V2mCb34W9TQ==', CAST(N'2021-07-21' AS Date), N'Cliente', CAST(N'2021-07-21' AS Date), N'Cliente')
INSERT [dbo].[Client] ([Id], [Name], [FirstSurName], [SecondSurName], [Address], [Phone], [SecondContact], [Email], [Password], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (9, N'Fabiola', N'Ramirez', N'Torres', N'Paraiso', N'87956248', N'25744136', N'fabi@gmail.com', N'3Ku7h1qVeN1xUKzss/hYmA==', CAST(N'2021-07-22' AS Date), N'Cliente', CAST(N'2021-07-22' AS Date), N'Cliente')
INSERT [dbo].[Client] ([Id], [Name], [FirstSurName], [SecondSurName], [Address], [Phone], [SecondContact], [Email], [Password], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (10, N'Alejandro', N'Quesada', N'Leiva', N'San jose', N'88888888', N'99999999', N'ale@', N'3Ku7h1qVeN1xUKzss/hYmA==', CAST(N'2021-07-22' AS Date), N'Cliente', CAST(N'2021-07-22' AS Date), N'Cliente')
SET IDENTITY_INSERT [dbo].[Client] OFF
GO
SET IDENTITY_INSERT [dbo].[ClientService] ON 

INSERT [dbo].[ClientService] ([Id], [IdClient], [IdService]) VALUES (8, 8, 3)
INSERT [dbo].[ClientService] ([Id], [IdClient], [IdService]) VALUES (9, 9, 3)
INSERT [dbo].[ClientService] ([Id], [IdClient], [IdService]) VALUES (10, 10, 3)
INSERT [dbo].[ClientService] ([Id], [IdClient], [IdService]) VALUES (11, 10, 4)
SET IDENTITY_INSERT [dbo].[ClientService] OFF
GO
SET IDENTITY_INSERT [dbo].[Comment] ON 

INSERT [dbo].[Comment] ([Id], [Description], [CommentTimeStamp], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdIssue]) VALUES (5, N'la señal es bastante mala pero lo compre la semana antepasada', CAST(N'2021-07-21T23:59:58.060' AS DateTime), CAST(N'2021-07-21' AS Date), N'Cliente', CAST(N'2021-07-21' AS Date), N'Cliente', 1)
INSERT [dbo].[Comment] ([Id], [Description], [CommentTimeStamp], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdIssue]) VALUES (6, N'no puedo acceder a la pagina de la UCR', CAST(N'2021-07-22T01:13:28.710' AS DateTime), CAST(N'2021-07-22' AS Date), N'Cliente', CAST(N'2021-07-22' AS Date), N'Cliente', 2)
INSERT [dbo].[Comment] ([Id], [Description], [CommentTimeStamp], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdIssue]) VALUES (7, N'El perro es un dalmata', CAST(N'2021-07-22T08:25:01.710' AS DateTime), CAST(N'2021-07-22' AS Date), N'Cliente', CAST(N'2021-07-22' AS Date), N'Cliente', 3)
SET IDENTITY_INSERT [dbo].[Comment] OFF
GO
SET IDENTITY_INSERT [dbo].[Issue] ON 

INSERT [dbo].[Issue] ([Id], [Description], [RegisterTimeStamp], [Address], [ContactPhone], [ContactEmail], [Status], [SupportUserAssigned], [IdClient], [ResolutionComment], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdService]) VALUES (1, N'no me sirven las llamadas', CAST(N'2021-07-21T23:59:24.730' AS DateTime), N'florida', N'346732', N'ariana20@gmail.com', N'Finalizado     ', N'Daniel', 8, N'arreglar los problemas especificados en el PDF', CAST(N'2021-07-21' AS Date), N'Cliente', CAST(N'2021-07-22' AS Date), N'Supporter', 4)
INSERT [dbo].[Issue] ([Id], [Description], [RegisterTimeStamp], [Address], [ContactPhone], [ContactEmail], [Status], [SupportUserAssigned], [IdClient], [ResolutionComment], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdService]) VALUES (2, N'La conexion se va de vez en cuando', CAST(N'2021-07-22T01:13:35.200' AS DateTime), N'paraiso', N'34547567', N'fabi@gmail.com', N'Finalizado     ', N'Daniel', 9, N'ejemplo de caso resuelto', CAST(N'2021-07-22' AS Date), N'Cliente', CAST(N'2021-07-22' AS Date), N'Supporter', 3)
INSERT [dbo].[Issue] ([Id], [Description], [RegisterTimeStamp], [Address], [ContactPhone], [ContactEmail], [Status], [SupportUserAssigned], [IdClient], [ResolutionComment], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdService]) VALUES (3, N'El perro se comio el cable del telefono fijo', CAST(N'2021-07-22T08:23:59.140' AS DateTime), N'av 10c', N'666666', N'pepe@', N'Finalizado     ', N'Daniel', 10, N'Ya le enviamos un tecnico', CAST(N'2021-07-22' AS Date), N'Cliente', CAST(N'2021-07-22' AS Date), N'Supporter', 4)
INSERT [dbo].[Issue] ([Id], [Description], [RegisterTimeStamp], [Address], [ContactPhone], [ContactEmail], [Status], [SupportUserAssigned], [IdClient], [ResolutionComment], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdService]) VALUES (4, N'El wifi es muy malo', CAST(N'2021-07-22T08:26:50.360' AS DateTime), N'Tejar', N'1111111', N'fran@', N'Ingresado      ', N'Sin asignar', 10, N'Sin resolver', CAST(N'2021-07-22' AS Date), N'Cliente', CAST(N'2021-07-22' AS Date), N'Supporter', 3)
SET IDENTITY_INSERT [dbo].[Issue] OFF
GO
SET IDENTITY_INSERT [dbo].[Service] ON 

INSERT [dbo].[Service] ([Id], [Name], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (1, N'Telefonía Móvil', CAST(N'2021-07-18' AS Date), N'Supervisor', CAST(N'2021-07-18' AS Date), N'Supervisor')
INSERT [dbo].[Service] ([Id], [Name], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (2, N'Cable', CAST(N'2021-07-18' AS Date), N'Supervisor', CAST(N'2021-07-18' AS Date), N'Supervisor')
INSERT [dbo].[Service] ([Id], [Name], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (3, N'Internet', CAST(N'2021-07-18' AS Date), N'Supervisor', CAST(N'2021-07-18' AS Date), N'Supervisor')
INSERT [dbo].[Service] ([Id], [Name], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (4, N'Telefonía Fija', CAST(N'2021-07-18' AS Date), N'Supervisor', CAST(N'2021-07-18' AS Date), N'Supervisor')
SET IDENTITY_INSERT [dbo].[Service] OFF
GO
ALTER TABLE [dbo].[Issue] ADD  CONSTRAINT [df_ResgisterTimeStamp]  DEFAULT (getdate()) FOR [RegisterTimeStamp]
GO
ALTER TABLE [dbo].[Issue] ADD  CONSTRAINT [df_InitialStatus]  DEFAULT ('Ingresado') FOR [Status]
GO
ALTER TABLE [dbo].[Issue] ADD  CONSTRAINT [df_CreationDate]  DEFAULT (getdate()) FOR [CreationDate]
GO
ALTER TABLE [dbo].[ClientService]  WITH CHECK ADD  CONSTRAINT [FK_ClientService_Client] FOREIGN KEY([IdClient])
REFERENCES [dbo].[Client] ([Id])
GO
ALTER TABLE [dbo].[ClientService] CHECK CONSTRAINT [FK_ClientService_Client]
GO
ALTER TABLE [dbo].[ClientService]  WITH CHECK ADD  CONSTRAINT [FK_ClientService_Service] FOREIGN KEY([IdService])
REFERENCES [dbo].[Service] ([Id])
GO
ALTER TABLE [dbo].[ClientService] CHECK CONSTRAINT [FK_ClientService_Service]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Issue] FOREIGN KEY([IdIssue])
REFERENCES [dbo].[Issue] ([Id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Issue]
GO
ALTER TABLE [dbo].[Issue]  WITH CHECK ADD  CONSTRAINT [FK_Issue_Client] FOREIGN KEY([IdClient])
REFERENCES [dbo].[Client] ([Id])
GO
ALTER TABLE [dbo].[Issue] CHECK CONSTRAINT [FK_Issue_Client]
GO
ALTER TABLE [dbo].[Issue]  WITH CHECK ADD  CONSTRAINT [FK_Issue_Service] FOREIGN KEY([IdService])
REFERENCES [dbo].[Service] ([Id])
GO
ALTER TABLE [dbo].[Issue] CHECK CONSTRAINT [FK_Issue_Service]
GO
/****** Object:  Trigger [dbo].[insert_Client]    Script Date: 22/7/2021 09:39:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[insert_Client]
ON  [dbo].[Client]   
AFTER INSERT 
AS  
BEGIN 
    UPDATE [dbo].[Client]
    SET CreationDate = GETDATE(),
	CreationUser = 'Cliente'
    FROM inserted 
     WHERE [dbo].[Client].Id = inserted.Id
END  
GO
ALTER TABLE [dbo].[Client] ENABLE TRIGGER [insert_Client]
GO
/****** Object:  Trigger [dbo].[update_Client]    Script Date: 22/7/2021 09:39:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


------------------------------------------------------


CREATE TRIGGER [dbo].[update_Client] ON [dbo].[Client]
    FOR UPDATE
    AS
    BEGIN

        UPDATE [dbo].[Client]
        SET UpdateDate = GETDATE(),
		UpdateUser = 'Cliente'
		FROM inserted
        WHERE [dbo].[Client].Id = inserted.Id
    END
GO
ALTER TABLE [dbo].[Client] ENABLE TRIGGER [update_Client]
GO
/****** Object:  Trigger [dbo].[insert_Comment]    Script Date: 22/7/2021 09:39:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[insert_Comment]
ON [dbo].[Comment]    
AFTER INSERT 
AS  
BEGIN 
    UPDATE [dbo].[Comment]
    SET CreationDate = GETDATE(),
	CreationUser = 'Cliente',
	CommentTimeStamp = GETDATE()
    FROM inserted 
     WHERE [dbo].[Comment].Id = inserted.Id
END  
GO
ALTER TABLE [dbo].[Comment] ENABLE TRIGGER [insert_Comment]
GO
/****** Object:  Trigger [dbo].[update_Comment]    Script Date: 22/7/2021 09:39:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


------------------------------------------------------


CREATE TRIGGER [dbo].[update_Comment] ON [dbo].[Comment]
    FOR UPDATE
    AS
    BEGIN

        UPDATE [dbo].[Comment]
        SET UpdateDate = GETDATE(),
		UpdateUser = 'Cliente'
		FROM inserted
        WHERE [dbo].[Comment].Id = inserted.Id
    END
GO
ALTER TABLE [dbo].[Comment] ENABLE TRIGGER [update_Comment]
GO
/****** Object:  Trigger [dbo].[insert_Issue]    Script Date: 22/7/2021 09:39:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[insert_Issue]
ON [dbo].[Issue]   
AFTER INSERT 
AS  
BEGIN 
    UPDATE [dbo].[Issue]
    SET CreationDate = GETDATE(),
	CreationUser = 'Cliente'
    FROM inserted 
     WHERE [dbo].[Issue].Id = inserted.Id
END  
GO
ALTER TABLE [dbo].[Issue] ENABLE TRIGGER [insert_Issue]
GO
/****** Object:  Trigger [dbo].[update_Issue]    Script Date: 22/7/2021 09:39:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


------------------------------------------------------


CREATE TRIGGER [dbo].[update_Issue] ON [dbo].[Issue]
    FOR UPDATE
    AS
    BEGIN

        UPDATE [dbo].[Issue]
        SET UpdateDate = GETDATE(),
		UpdateUser = 'Supporter'
		FROM inserted
        WHERE [dbo].[Issue].Id = inserted.Id
    END
GO
ALTER TABLE [dbo].[Issue] ENABLE TRIGGER [update_Issue]
GO
/****** Object:  Trigger [dbo].[insert_Service]    Script Date: 22/7/2021 09:39:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[insert_Service]
ON [dbo].[Service]   
AFTER INSERT 
AS  
BEGIN 
    UPDATE [dbo].[Service]
    SET CreationDate = GETDATE(),
	CreationUser = 'Supervisor'
    FROM inserted 
     WHERE [dbo].[Service].Id = inserted.Id
END  
GO
ALTER TABLE [dbo].[Service] ENABLE TRIGGER [insert_Service]
GO
/****** Object:  Trigger [dbo].[update_Service]    Script Date: 22/7/2021 09:39:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[update_Service] ON [dbo].[Service]
    FOR UPDATE
    AS
    BEGIN

        UPDATE [dbo].[Service]
        SET UpdateDate = GETDATE(),
		UpdateUser = 'Supervisor'
		FROM inserted
        WHERE [dbo].[Service].Id = inserted.Id
    END
GO
ALTER TABLE [dbo].[Service] ENABLE TRIGGER [update_Service]
GO
USE [master]
GO
ALTER DATABASE [AldifaSoftClient] SET  READ_WRITE 
GO
