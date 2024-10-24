export interface Cita {
    ID_Paciente: number | null;
    NombrePaciente: string | null;
    EdadPaciente: number | null;
    GeneroPaciente: string | null;
    CorreoPaciente: string | null;
    TelefonoPaciente: string | null;
    NacimientoPaciente: Date | null;
    Id_personal: number;
    NombreDoctor: string;
    ApellidoPaternoDoctor: string;
    ApellidoMaternoDoctor: string;
    ID_Cita: number;
    HoraCita: string;
  }
  