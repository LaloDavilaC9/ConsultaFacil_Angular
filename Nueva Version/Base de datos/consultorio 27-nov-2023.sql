-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2023 at 09:16 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `consultorio`
--

-- --------------------------------------------------------

--
-- Table structure for table `cita`
--

CREATE TABLE `cita` (
  `ID_Cita` int(11) NOT NULL,
  `ID_Paciente` int(11) DEFAULT NULL COMMENT 'Null porque quiere decir que la hora está habilitada',
  `Id_personal` int(11) NOT NULL,
  `Fecha` datetime NOT NULL,
  `Finalizada` tinyint(1) DEFAULT NULL,
  `Opinion` varchar(2000) DEFAULT NULL,
  `Estrellas` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cita`
--

INSERT INTO `cita` (`ID_Cita`, `ID_Paciente`, `Id_personal`, `Fecha`, `Finalizada`, `Opinion`, `Estrellas`) VALUES
(1, 1, 1, '2023-11-01 10:00:00', 1, 'Buena atención', 4),
(2, 2, 2, '2023-11-02 14:30:00', NULL, NULL, NULL),
(3, NULL, 3, '2023-11-03 11:15:00', NULL, NULL, NULL),
(4, 4, 4, '2023-11-04 09:45:00', 0, NULL, NULL),
(5, 5, 5, '2023-11-05 13:00:00', 1, 'Excelente servicio', 5),
(6, 3, 4, '2023-11-06 15:30:00', NULL, NULL, NULL),
(7, NULL, 1, '2023-11-07 12:45:00', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `consultorio`
--

CREATE TABLE `consultorio` (
  `ID_Consultorio` int(11) NOT NULL,
  `Nombre_consultorio` varchar(255) DEFAULT NULL,
  `Id_especialidad` int(11) DEFAULT NULL,
  `Costo_Consulta` decimal(10,2) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  `Ubicacion` varchar(255) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consultorio`
--

INSERT INTO `consultorio` (`ID_Consultorio`, `Nombre_consultorio`, `Id_especialidad`, `Costo_Consulta`, `Descripcion`, `Ubicacion`, `Telefono`) VALUES
(1, 'Consultorio Médico A', 3, '50.00', 'Especializado en medicina general.', 'Calle 123, Ciudad', '555-123-4567'),
(2, 'Dental Care Center', 2, '80.00', 'Especializado en odontología.', 'Avenida Principal, Ciudad', '555-987-6543'),
(3, 'Dermatology Clinic', 5, '70.00', 'Especializado en dermatología.', 'Calle Principal, Ciudad', '555-555-5555'),
(4, 'Gynecology Clinic', 1, '60.00', 'Especializado en ginecología.', 'Avenida Central, Ciudad', '555-111-2222'),
(5, 'Chiropractic Wellness', 4, '90.00', 'Especializado en quiropráctica.', 'Calle 456, Ciudad', '555-777-8888');

-- --------------------------------------------------------

--
-- Table structure for table `consultorio_especialidad`
--

CREATE TABLE `consultorio_especialidad` (
  `Id_consultorio` int(11) NOT NULL,
  `Id_especialidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consultorio_especialidad`
--

INSERT INTO `consultorio_especialidad` (`Id_consultorio`, `Id_especialidad`) VALUES
(1, 3),
(2, 2),
(3, 5),
(4, 1),
(5, 4),
(5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `consultorio_personal`
--

CREATE TABLE `consultorio_personal` (
  `Id_consultorio` int(11) NOT NULL,
  `Id_personal` int(11) NOT NULL,
  `Id_especialidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consultorio_personal`
--

INSERT INTO `consultorio_personal` (`Id_consultorio`, `Id_personal`, `Id_especialidad`) VALUES
(1, 1, 3),
(2, 2, 2),
(3, 3, 5),
(4, 4, 1),
(5, 5, 4),
(5, 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `especialidad`
--

CREATE TABLE `especialidad` (
  `Id_especialidad` int(11) NOT NULL,
  `Nombre_especialidad` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `especialidad`
--

INSERT INTO `especialidad` (`Id_especialidad`, `Nombre_especialidad`) VALUES
(1, 'Ginecología'),
(2, 'Odontología'),
(3, 'Medicina General'),
(4, 'Quiropráctica'),
(5, 'Dermatología');

-- --------------------------------------------------------

--
-- Table structure for table `paciente`
--

CREATE TABLE `paciente` (
  `ID_Paciente` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Edad` int(2) DEFAULT NULL,
  `Genero` varchar(10) DEFAULT NULL,
  `Correo` varchar(255) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Nacimiento` date NOT NULL,
  `Nombre_usuario` varchar(255) NOT NULL,
  `Contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paciente`
--

INSERT INTO `paciente` (`ID_Paciente`, `Nombre`, `Edad`, `Genero`, `Correo`, `Telefono`, `Nacimiento`, `Nombre_usuario`, `Contrasena`) VALUES
(1, 'Ana Pérez', 30, 'Femenino', 'ana.perez@example.com', '555-123-4567', '1993-08-10', 'ana_perez', 'contraseña123'),
(2, 'Javier López', 25, 'Masculino', 'javier.lopez@example.com', '555-987-6543', '1998-05-20', 'javier_lopez', 'segura123'),
(3, 'María González', 45, 'Femenino', 'maria.gonzalez@example.com', '555-555-5555', '1978-11-30', 'maria_gonzalez', 'mipassword'),
(4, 'Carlos Martínez', 35, 'Masculino', 'carlos.martinez@example.com', '555-111-2222', '1988-03-15', 'carlos_martinez', 'miclave'),
(5, 'Laura Sánchez', 28, 'Femenino', 'laura.sanchez@example.com', '555-777-8888', '1995-12-05', 'laura_sanchez', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `personal`
--

CREATE TABLE `personal` (
  `Id_personal` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido_Paterno` varchar(255) NOT NULL,
  `Apellido_Materno` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personal`
--

INSERT INTO `personal` (`Id_personal`, `Nombre`, `Apellido_Paterno`, `Apellido_Materno`) VALUES
(1, 'Juan', 'González', 'López'),
(2, 'María', 'Martínez', 'Rodríguez'),
(3, 'Carlos', 'Sánchez', 'Gómez'),
(4, 'Laura', 'López', 'Hernández'),
(5, 'Pedro', 'Gómez', 'Martínez');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`ID_Cita`),
  ADD KEY `ID_Paciente` (`ID_Paciente`),
  ADD KEY `Id_personal` (`Id_personal`);

--
-- Indexes for table `consultorio`
--
ALTER TABLE `consultorio`
  ADD PRIMARY KEY (`ID_Consultorio`),
  ADD KEY `Id_especialidad` (`Id_especialidad`);

--
-- Indexes for table `consultorio_especialidad`
--
ALTER TABLE `consultorio_especialidad`
  ADD KEY `Id_consultorio` (`Id_consultorio`),
  ADD KEY `Id_especialidad` (`Id_especialidad`);

--
-- Indexes for table `consultorio_personal`
--
ALTER TABLE `consultorio_personal`
  ADD KEY `Id_consultorio` (`Id_consultorio`),
  ADD KEY `Id_personal` (`Id_personal`),
  ADD KEY `Id_especialidad` (`Id_especialidad`);

--
-- Indexes for table `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`Id_especialidad`);

--
-- Indexes for table `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`ID_Paciente`);

--
-- Indexes for table `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`Id_personal`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `Id_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `personal`
--
ALTER TABLE `personal`
  MODIFY `Id_personal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`ID_Paciente`) REFERENCES `paciente` (`ID_Paciente`),
  ADD CONSTRAINT `cita_ibfk_3` FOREIGN KEY (`Id_personal`) REFERENCES `personal` (`Id_personal`);

--
-- Constraints for table `consultorio`
--
ALTER TABLE `consultorio`
  ADD CONSTRAINT `consultorio_ibfk_1` FOREIGN KEY (`Id_especialidad`) REFERENCES `especialidad` (`Id_especialidad`);

--
-- Constraints for table `consultorio_especialidad`
--
ALTER TABLE `consultorio_especialidad`
  ADD CONSTRAINT `consultorio_especialidad_ibfk_1` FOREIGN KEY (`Id_consultorio`) REFERENCES `consultorio` (`ID_Consultorio`),
  ADD CONSTRAINT `consultorio_especialidad_ibfk_2` FOREIGN KEY (`Id_especialidad`) REFERENCES `especialidad` (`Id_especialidad`);

--
-- Constraints for table `consultorio_personal`
--
ALTER TABLE `consultorio_personal`
  ADD CONSTRAINT `consultorio_personal_ibfk_1` FOREIGN KEY (`Id_consultorio`) REFERENCES `consultorio` (`ID_Consultorio`),
  ADD CONSTRAINT `consultorio_personal_ibfk_2` FOREIGN KEY (`Id_personal`) REFERENCES `personal` (`Id_personal`),
  ADD CONSTRAINT `consultorio_personal_ibfk_3` FOREIGN KEY (`Id_especialidad`) REFERENCES `especialidad` (`Id_especialidad`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
