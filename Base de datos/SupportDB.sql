USE [master]
GO
/****** Object:  Database [AldifaSoftSupport]    Script Date: 22/7/2021 09:38:42 ******/
CREATE DATABASE [AldifaSoftSupport]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AldifaSoftSupport', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\AldifaSoftSupport.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 10%)
 LOG ON 
( NAME = N'AldifaSoftSupport_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\AldifaSoftSupport_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [AldifaSoftSupport] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AldifaSoftSupport].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AldifaSoftSupport] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET ARITHABORT OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AldifaSoftSupport] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AldifaSoftSupport] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET  DISABLE_BROKER 
GO
ALTER DATABASE [AldifaSoftSupport] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AldifaSoftSupport] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [AldifaSoftSupport] SET  MULTI_USER 
GO
ALTER DATABASE [AldifaSoftSupport] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AldifaSoftSupport] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AldifaSoftSupport] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AldifaSoftSupport] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [AldifaSoftSupport] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [AldifaSoftSupport] SET QUERY_STORE = OFF
GO
USE [AldifaSoftSupport]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [AldifaSoftSupport]
GO
/****** Object:  Table [dbo].[Issue]    Script Date: 22/7/2021 09:38:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Issue](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Reference] [nvarchar](20) NULL,
	[Classification] [nchar](6) NULL,
	[Status] [nvarchar](15) NULL,
	[IssueTimeStamp] [datetime] NULL,
	[ResolutionComment] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[IdClient] [int] NULL,
	[EmailIssue] [nvarchar](70) NULL,
	[PhoneIssue] [nvarchar](20) NULL,
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
/****** Object:  Table [dbo].[Notes]    Script Date: 22/7/2021 09:38:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[NoteTimeStamp] [datetime] NULL,
	[CreationDate] [date] NULL,
	[CreationUser] [nvarchar](20) NULL,
	[UpdateDate] [date] NULL,
	[UpdateUser] [nvarchar](20) NULL,
	[IdSupporter] [int] NULL,
	[IdSupervisor] [int] NULL,
	[IdIssue] [int] NULL,
 CONSTRAINT [PK_Notes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Service]    Script Date: 22/7/2021 09:38:42 ******/
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
/****** Object:  Table [dbo].[Supervisor]    Script Date: 22/7/2021 09:38:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Supervisor](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NULL,
	[FirstSurName] [nvarchar](20) NULL,
	[SecondSurName] [nvarchar](20) NULL,
	[Email] [nvarchar](70) NULL,
	[Password] [nvarchar](20) NULL,
	[CreationDate] [datetime] NULL,
	[CreationUser] [nvarchar](20) NULL,
	[UpdateDate] [date] NULL,
	[UpdateUser] [nvarchar](20) NULL,
 CONSTRAINT [PK_Supervisor] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Supporter]    Script Date: 22/7/2021 09:38:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Supporter](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NULL,
	[FirstSurName] [nvarchar](20) NULL,
	[SecondSurName] [nvarchar](20) NULL,
	[Email] [nvarchar](70) NULL,
	[Password] [nvarchar](20) NULL,
	[CreationDate] [date] NULL,
	[CreationUser] [nvarchar](20) NULL,
	[UpdateDate] [date] NULL,
	[UpdateUser] [nvarchar](20) NULL,
 CONSTRAINT [PK_Supporter] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SupporterService]    Script Date: 22/7/2021 09:38:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SupporterService](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdSupporter] [int] NULL,
	[IdService] [int] NULL,
 CONSTRAINT [PK_SupporterService] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Issue] ON 

INSERT [dbo].[Issue] ([Id], [Reference], [Classification], [Status], [IssueTimeStamp], [ResolutionComment], [Description], [IdClient], [EmailIssue], [PhoneIssue], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdService]) VALUES (1, N'Daniel', N'Baja  ', N'Finalizado', CAST(N'2021-07-21T23:59:15.250' AS DateTime), N'arreglar los problemas especificados en el PDF', N'no me sirven las llamadas', 8, N'ariana20@gmail.com', N'346732', CAST(N'2021-07-21' AS Date), N'Client', CAST(N'2021-07-22' AS Date), N'Technical User', 4)
INSERT [dbo].[Issue] ([Id], [Reference], [Classification], [Status], [IssueTimeStamp], [ResolutionComment], [Description], [IdClient], [EmailIssue], [PhoneIssue], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdService]) VALUES (2, N'Daniel', N'Baja  ', N'Finalizado', CAST(N'2021-07-22T01:13:26.773' AS DateTime), N'ejemplo de caso resuelto', N'La conexion se va de vez en cuando', 9, N'fabi@gmail.com', N'34547567', CAST(N'2021-07-22' AS Date), N'Client', CAST(N'2021-07-22' AS Date), N'Technical User', 3)
INSERT [dbo].[Issue] ([Id], [Reference], [Classification], [Status], [IssueTimeStamp], [ResolutionComment], [Description], [IdClient], [EmailIssue], [PhoneIssue], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdService]) VALUES (3, N'Daniel', N'Alta  ', N'Finalizado', CAST(N'2021-07-22T08:23:52.290' AS DateTime), N'Ya le enviamos un tecnico', N'El perro se comio el cable del telefono fijo', 10, N'pepe@', N'666666', CAST(N'2021-07-22' AS Date), N'Client', CAST(N'2021-07-22' AS Date), N'Technical User', 4)
INSERT [dbo].[Issue] ([Id], [Reference], [Classification], [Status], [IssueTimeStamp], [ResolutionComment], [Description], [IdClient], [EmailIssue], [PhoneIssue], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdService]) VALUES (4, N'Sin asignar', N'Media ', N'Ingresado', CAST(N'2021-07-22T08:26:41.177' AS DateTime), N'Sin resolver', N'El wifi es muy malo', 10, N'fran@', N'1111111', CAST(N'2021-07-22' AS Date), N'Client', CAST(N'2021-07-22' AS Date), N'Technical User', 3)
SET IDENTITY_INSERT [dbo].[Issue] OFF
GO
SET IDENTITY_INSERT [dbo].[Notes] ON 

INSERT [dbo].[Notes] ([Id], [Description], [NoteTimeStamp], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdSupporter], [IdSupervisor], [IdIssue]) VALUES (1, N'que perro mas tortero', CAST(N'2021-07-22T08:58:33.450' AS DateTime), CAST(N'2021-07-22' AS Date), N'Technical User', CAST(N'2021-07-22' AS Date), N'Technical User', NULL, 2, 3)
INSERT [dbo].[Notes] ([Id], [Description], [NoteTimeStamp], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser], [IdSupporter], [IdSupervisor], [IdIssue]) VALUES (2, N'Esto de ultimo', CAST(N'2021-07-22T09:12:48.413' AS DateTime), CAST(N'2021-07-22' AS Date), N'Technical User', CAST(N'2021-07-22' AS Date), N'Technical User', 5, 2, 4)
SET IDENTITY_INSERT [dbo].[Notes] OFF
GO
SET IDENTITY_INSERT [dbo].[Service] ON 

INSERT [dbo].[Service] ([Id], [Name], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (1, N'Telefonía Móvil', CAST(N'2021-07-11' AS Date), NULL, NULL, NULL)
INSERT [dbo].[Service] ([Id], [Name], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (2, N'Cable', CAST(N'2021-07-11' AS Date), NULL, NULL, NULL)
INSERT [dbo].[Service] ([Id], [Name], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (3, N'Internet', CAST(N'2021-07-11' AS Date), NULL, NULL, NULL)
INSERT [dbo].[Service] ([Id], [Name], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (4, N'Telefonía Fija', CAST(N'2021-07-11' AS Date), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Service] OFF
GO
SET IDENTITY_INSERT [dbo].[Supervisor] ON 

INSERT [dbo].[Supervisor] ([Id], [Name], [FirstSurName], [SecondSurName], [Email], [Password], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (1, N'Mario', N'Castañeda', N'Lopez', N'mariocl@gmail.com', N'123', CAST(N'2021-07-22T00:25:47.297' AS DateTime), N'Supervisor', CAST(N'2021-07-22' AS Date), N'Supervisor')
INSERT [dbo].[Supervisor] ([Id], [Name], [FirstSurName], [SecondSurName], [Email], [Password], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (2, N'Daniel', N'Valencia', N'Gutierrez', N'dani@s', N'834errVfEYA=', CAST(N'2021-07-22T00:25:47.297' AS DateTime), N'Supervisor', CAST(N'2021-07-22' AS Date), N'Supervisor')
INSERT [dbo].[Supervisor] ([Id], [Name], [FirstSurName], [SecondSurName], [Email], [Password], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (3, N'usoJuan', N'Mora', N'Mora', N'mora@g', N'ezHHSj622AY=', CAST(N'2021-07-22T08:51:21.650' AS DateTime), N'Supervisor', CAST(N'2021-07-22' AS Date), N'Supervisor')
SET IDENTITY_INSERT [dbo].[Supervisor] OFF
GO
SET IDENTITY_INSERT [dbo].[Supporter] ON 

INSERT [dbo].[Supporter] ([Id], [Name], [FirstSurName], [SecondSurName], [Email], [Password], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (1, N'Valery', N'Torres', N'Mora', N'vale@gmail.com', N'834errVfEYA=', CAST(N'2021-07-22' AS Date), N'Supervisor', CAST(N'2021-07-22' AS Date), N'Supporter')
INSERT [dbo].[Supporter] ([Id], [Name], [FirstSurName], [SecondSurName], [Email], [Password], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (2, N'Hillary', N'Serrano', N'Chavez', N'hilly@gmail.com', N'834errVfEYA=', CAST(N'2021-07-22' AS Date), N'Supervisor', CAST(N'2021-07-22' AS Date), N'Supporter')
INSERT [dbo].[Supporter] ([Id], [Name], [FirstSurName], [SecondSurName], [Email], [Password], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (3, N'Elmer', N'Aguilar', N'Leiva', N'elmeraguiar@gmail.com', N'834errVfEYA=', CAST(N'2021-07-22' AS Date), N'Supervisor', CAST(N'2021-07-22' AS Date), N'Supporter')
INSERT [dbo].[Supporter] ([Id], [Name], [FirstSurName], [SecondSurName], [Email], [Password], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (4, N'Luis', N'Barquero', N'Solano', N'luis@gmail.com', N'834errVfEYA=', CAST(N'2021-07-22' AS Date), N'Supervisor', CAST(N'2021-07-22' AS Date), N'Supporter')
INSERT [dbo].[Supporter] ([Id], [Name], [FirstSurName], [SecondSurName], [Email], [Password], [CreationDate], [CreationUser], [UpdateDate], [UpdateUser]) VALUES (5, N'usoJuan', N'Mora', N'Mora', N'mora@gg', N'ezHHSj622AY=', NULL, NULL, CAST(N'2021-07-22' AS Date), N'Supporter')
SET IDENTITY_INSERT [dbo].[Supporter] OFF
GO
SET IDENTITY_INSERT [dbo].[SupporterService] ON 

INSERT [dbo].[SupporterService] ([Id], [IdSupporter], [IdService]) VALUES (1, 1, 2)
INSERT [dbo].[SupporterService] ([Id], [IdSupporter], [IdService]) VALUES (2, 2, 2)
INSERT [dbo].[SupporterService] ([Id], [IdSupporter], [IdService]) VALUES (3, 3, 2)
INSERT [dbo].[SupporterService] ([Id], [IdSupporter], [IdService]) VALUES (4, 4, 2)
INSERT [dbo].[SupporterService] ([Id], [IdSupporter], [IdService]) VALUES (5, 5, 3)
INSERT [dbo].[SupporterService] ([Id], [IdSupporter], [IdService]) VALUES (6, 5, 4)
SET IDENTITY_INSERT [dbo].[SupporterService] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Supervis__A9D10534908AFB69]    Script Date: 22/7/2021 09:38:42 ******/
ALTER TABLE [dbo].[Supervisor] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Supporte__A9D1053471A2F5B1]    Script Date: 22/7/2021 09:38:42 ******/
ALTER TABLE [dbo].[Supporter] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Issue] ADD  CONSTRAINT [df_IssueTimeStamp]  DEFAULT (getdate()) FOR [IssueTimeStamp]
GO
ALTER TABLE [dbo].[Issue] ADD  CONSTRAINT [df_CreationDate]  DEFAULT (getdate()) FOR [CreationDate]
GO
ALTER TABLE [dbo].[Issue]  WITH CHECK ADD  CONSTRAINT [FK_Issue_Service] FOREIGN KEY([IdService])
REFERENCES [dbo].[Service] ([Id])
GO
ALTER TABLE [dbo].[Issue] CHECK CONSTRAINT [FK_Issue_Service]
GO
ALTER TABLE [dbo].[Notes]  WITH CHECK ADD  CONSTRAINT [FK_Notes_Issue] FOREIGN KEY([IdIssue])
REFERENCES [dbo].[Issue] ([Id])
GO
ALTER TABLE [dbo].[Notes] CHECK CONSTRAINT [FK_Notes_Issue]
GO
ALTER TABLE [dbo].[Notes]  WITH CHECK ADD  CONSTRAINT [FK_Notes_Supervisor] FOREIGN KEY([IdSupervisor])
REFERENCES [dbo].[Supervisor] ([Id])
GO
ALTER TABLE [dbo].[Notes] CHECK CONSTRAINT [FK_Notes_Supervisor]
GO
ALTER TABLE [dbo].[Notes]  WITH CHECK ADD  CONSTRAINT [FK_Notes_Supporter] FOREIGN KEY([IdSupporter])
REFERENCES [dbo].[Supporter] ([Id])
GO
ALTER TABLE [dbo].[Notes] CHECK CONSTRAINT [FK_Notes_Supporter]
GO
ALTER TABLE [dbo].[SupporterService]  WITH CHECK ADD  CONSTRAINT [FK_SupporterService_Service] FOREIGN KEY([IdService])
REFERENCES [dbo].[Service] ([Id])
GO
ALTER TABLE [dbo].[SupporterService] CHECK CONSTRAINT [FK_SupporterService_Service]
GO
ALTER TABLE [dbo].[SupporterService]  WITH CHECK ADD  CONSTRAINT [FK_SupporterService_Supporter] FOREIGN KEY([IdSupporter])
REFERENCES [dbo].[Supporter] ([Id])
GO
ALTER TABLE [dbo].[SupporterService] CHECK CONSTRAINT [FK_SupporterService_Supporter]
GO
/****** Object:  Trigger [dbo].[insert_Issue]    Script Date: 22/7/2021 09:38:42 ******/
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
	CreationUser = 'Client'
    FROM inserted 
     WHERE [dbo].[Issue].Id = inserted.Id
END  
GO
ALTER TABLE [dbo].[Issue] ENABLE TRIGGER [insert_Issue]
GO
/****** Object:  Trigger [dbo].[update_Issue]    Script Date: 22/7/2021 09:38:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[update_Issue] ON [dbo].[Issue]
    FOR UPDATE
    AS
    BEGIN

        UPDATE [dbo].[Issue]
        SET UpdateDate = GETDATE(),
		UpdateUser = 'Technical User'
		FROM inserted
        WHERE [dbo].[Issue].Id = inserted.Id
    END
GO
ALTER TABLE [dbo].[Issue] ENABLE TRIGGER [update_Issue]
GO
/****** Object:  Trigger [dbo].[insert_Notes]    Script Date: 22/7/2021 09:38:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[insert_Notes]
ON [dbo].[Notes]
AFTER INSERT 
AS  
BEGIN 
    UPDATE [dbo].[Notes]
    SET CreationDate = GETDATE(),
	CreationUser = 'Technical User',
	NoteTimeStamp = GETDATE()
    FROM inserted 
     WHERE [dbo].[Notes].Id = inserted.Id
END  
GO
ALTER TABLE [dbo].[Notes] ENABLE TRIGGER [insert_Notes]
GO
/****** Object:  Trigger [dbo].[update_Notes]    Script Date: 22/7/2021 09:38:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[update_Notes] ON [dbo].[Notes]
    FOR UPDATE
    AS
    BEGIN

        UPDATE [dbo].[Notes]
        SET UpdateDate = GETDATE(),
		UpdateUser = 'Technical User'
		FROM inserted
        WHERE [dbo].[Notes].Id = inserted.Id
    END
GO
ALTER TABLE [dbo].[Notes] ENABLE TRIGGER [update_Notes]
GO
/****** Object:  Trigger [dbo].[insert_Service]    Script Date: 22/7/2021 09:38:43 ******/
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
/****** Object:  Trigger [dbo].[update_Service]    Script Date: 22/7/2021 09:38:43 ******/
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
/****** Object:  Trigger [dbo].[insert_Supervisor]    Script Date: 22/7/2021 09:38:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[insert_Supervisor]
ON   [dbo].[Supervisor]
AFTER INSERT 
AS  
BEGIN 
    UPDATE [dbo].[Supervisor]
    SET CreationDate = GETDATE(),
	CreationUser = 'Supervisor'
    FROM inserted 
     WHERE [dbo].[Supervisor].Id = inserted.Id
END  
GO
ALTER TABLE [dbo].[Supervisor] ENABLE TRIGGER [insert_Supervisor]
GO
/****** Object:  Trigger [dbo].[update_Supervisor]    Script Date: 22/7/2021 09:38:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[update_Supervisor] ON [dbo].[Supervisor]
    FOR UPDATE
    AS
    BEGIN

        UPDATE [dbo].[Supervisor]
        SET UpdateDate = GETDATE(),
		UpdateUser = 'Supervisor'
		FROM inserted
        WHERE [dbo].[Supervisor].Id = inserted.Id
    END
GO
ALTER TABLE [dbo].[Supervisor] ENABLE TRIGGER [update_Supervisor]
GO
/****** Object:  Trigger [dbo].[insert_Supporter]    Script Date: 22/7/2021 09:38:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[insert_Supporter]
ON  [dbo].[Supporter]  
AFTER INSERT 
AS  
BEGIN 
    UPDATE [dbo].[Supporter]  
    SET CreationDate = GETDATE(),
	CreationUser = 'Supervisor'
    FROM inserted 
     WHERE [dbo].[Supporter].Id = inserted.Id
END  
GO
ALTER TABLE [dbo].[Supporter] ENABLE TRIGGER [insert_Supporter]
GO
/****** Object:  Trigger [dbo].[update_Supporter]    Script Date: 22/7/2021 09:38:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[update_Supporter] ON [dbo].[Supporter]
    FOR UPDATE
    AS
    BEGIN

        UPDATE [dbo].[Supporter]
        SET UpdateDate = GETDATE(),
		UpdateUser = 'Supporter'
		FROM inserted
        WHERE [dbo].[Supporter].Id = inserted.Id
    END
GO
ALTER TABLE [dbo].[Supporter] ENABLE TRIGGER [update_Supporter]
GO
USE [master]
GO
ALTER DATABASE [AldifaSoftSupport] SET  READ_WRITE 
GO
