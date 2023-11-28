const { log } = require("console");
const conexion = require("./conexion");

module.exports = {
    
    citasDeUnDia: (connection, fecha,callback) => {
      let query = `SELECT
      p.ID_Paciente,
      p.Nombre,
      p.Edad,
      DATE_FORMAT(c.Fecha, '%Y-%m-%d') AS FechaFormateada,
      DATE_FORMAT(p.Nacimiento, '%Y-%m-%d') AS Nacimiento,
      NumCitas.TotalCitas
      FROM
          paciente p
      INNER JOIN
          cita c ON p.ID_Paciente = c.ID_Paciente
      LEFT JOIN (
          SELECT
              ID_Paciente,
              COUNT(ID_Cita) AS TotalCitas
          FROM
              cita
          GROUP BY
              ID_Paciente
      ) AS NumCitas ON p.ID_Paciente = NumCitas.ID_Paciente
        WHERE
              DATE_FORMAT(Fecha, '%Y-%m-%d') = '${fecha}';
      `;


      connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        callback({ array: results, id: null, success: true });
      });
    },


    historicoConsultorio: (connection, idConsultorio,callback) => {
      let query = `
      SELECT
          c.ID_Cita AS NumeroCita,
          DATE_FORMAT(c.Fecha, '%Y-%m-%d %H:%i:%s') as Fecha,
          p.Nombre AS NombrePaciente,
          CONCAT(pe.Nombre, ' ', pe.Apellido_Paterno, ' ', pe.Apellido_Materno) AS NombreDoctor,
          p.Edad AS EdadPaciente,
          esp.Nombre_especialidad AS EspecialidadConsultorio
      FROM
          cita c
      INNER JOIN paciente p ON c.ID_Paciente = p.ID_Paciente
      INNER JOIN personal pe ON c.Id_personal = pe.Id_personal
      INNER JOIN consultorio co ON pe.Id_consultorio = co.ID_Consultorio
      INNER JOIN especialidad esp ON pe.Id_especialidad = esp.Id_especialidad
      
      WHERE
      c.Finalizada = 1 AND co.ID_Consultorio =`+idConsultorio+` ;`;

      connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        callback({ array: results, id: null, success: true });
      });
    },

    personalConsultorio: (connection, idConsultorio,callback) => {
      let query = `
      SELECT p.*, e.Nombre_especialidad FROM personal p 
      JOIN especialidad e ON p.Id_Especialidad = e.Id_Especialidad WHERE p.Id_Consultorio=`+idConsultorio+` ;`;

      connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        callback({ array: results, id: null, success: true });
      });
    },

    consultoriosDisponibles: (connection,callback) => {
      let query = `
        SELECT
        ID_Consultorio,
        Nombre_Consultorio,
        Costo_Consulta,
        Descripcion,
        Ubicacion,
        Telefono
        FROM
        consultorio;
      `;  

     
      connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        callback({ array: results, id: null, success: true });
      });
    },


    especialidadesConsultorio: (connection, idConsultorio,callback) => {
      let query = `
      SELECT Especialidad.Nombre_especialidad AS NombreEspecialidad,
      Especialidad.id_especialidad AS id_especialidad
      FROM especialidad_consultorio
      JOIN consultorio ON consultorio.ID_Consultorio = especialidad_consultorio.Id_consultorio
      JOIN especialidad ON especialidad.Id_especialidad = especialidad_consultorio.Id_especialidad
      WHERE especialidad_consultorio.ID_Consultorio = `+idConsultorio+` ;`;
      connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        callback({ array: results, id: null, success: true });
      });
    },
   
    /* personalConsultorio: (connection, idConsultorio,callback) => {
      let query = `
      SELECT Especialidad.Nombre_especialidad AS NombreEspecialidad,
      Especialidad.id_especialidad AS id_especialidad
      FROM especialidad_consultorio
      JOIN consultorio ON consultorio.ID_Consultorio = especialidad_consultorio.Id_consultorio
      JOIN especialidad ON especialidad.Id_especialidad = especialidad_consultorio.Id_especialidad
      WHERE especialidad_consultorio.ID_Consultorio = `+idConsultorio+` ;`;

      connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        callback({ array: results, id: null, success: true });
      });
    }, */

    insertarAlumnoSolicitud: async (connection, alumno_id,solicitud_id, callback) => {
      //console.log("Llega: "+body.solicitud_fecha);
      let query = "insert into alumno_solicitud (alumno_id,solicitud_id,alumno_encargado,alumno_asistencia) VALUES ("+alumno_id+","+solicitud_id+",1,0)";

      try {
        await connection.promise().query(query)  
        callback({ array: null, id: null, success: true });      
      } catch (err) {
        callback({ array: null, id: null, success: false, err: JSON.stringify(err) });      
      }

      // connection.query(query, (err, results) => {
      //   if (err) {
      //     callback({
      //       array: null,
      //       id: null,
      //       success: false,
      //       err: JSON.stringify(err),
      //     });
      //     return;
      //   }
      //   callback({ array: null, id: null, success: true });
      // });
    },

    
    estadoDeAgenda: (connection, Id_consultorio,fecha, callback) => {
        let query = `
            SELECT
            p.ID_Paciente,
            p.Nombre AS NombrePaciente,
            p.Edad AS EdadPaciente,
            p.Genero AS GeneroPaciente,
            p.Correo AS CorreoPaciente,
            p.Telefono AS TelefonoPaciente,
            p.Nacimiento AS NacimientoPaciente,
            d.Id_personal,
            d.Nombre AS NombreDoctor,
            d.Apellido_Paterno AS ApellidoPaternoDoctor,
            d.Apellido_Materno AS ApellidoMaternoDoctor,
            c.ID_Cita,
            TIME(c.Fecha) AS HoraCita
            FROM
                cita c
            JOIN
                personal d ON c.Id_personal = d.Id_personal
            LEFT JOIN
                paciente p ON c.ID_Paciente = p.ID_Paciente
            WHERE
                DATE(c.Fecha) = '`+fecha+`'AND
                d.Id_consultorio = `+Id_consultorio+`;
        `;
        console.log(query);
     
      id = connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        //console.log("Results son: "+results);
        callback({ array: results, id: null, success: true });
      });
    },

    


    agregarPersonal: (connection,body, callback) => {
      let Id_consultorio = body.Id_consultorio;
      let Id_especialidad = body.Id_especialidad;
      let nombre = body.nombre;
      let app = body.app;
      let apm = body.apm;

      query = "INSERT INTO personal (Id_consultorio, Id_especialidad, Nombre, Apellido_Paterno,Apellido_Materno) VALUES ("+Id_consultorio+", "+Id_especialidad+",'"+nombre+"','"+app+"','"+apm+"')";
      connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        callback({ array: null, id: null, success: true });
      });
    },

    darDeBajaPersonal: (connection,body, callback) => {
      let Id_personal = body.Id_personal;

      query = "DELETE FROM personal WHERE id_personal = "+Id_personal;
      connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        callback({ array: null, id: null, success: true });
      });
    },

    configurarAgenda: (connection,body, callback) => {
      let fecha = body.fecha;
      let id_personal = body.id_personal;
      let accion = body.accion;
      let query = "";
      let id_cita = body.id_cita;
      if(accion == 0){ //Habilitar hora
        query = "INSERT INTO cita (Fecha, Id_personal) VALUES ('"+fecha+"', "+id_personal+");";
      }
      else if(accion==1){//Deshabilitar hora
        query = "DELETE FROM cita WHERE id_cita = "+id_cita;
      }

       
      console.log(query);
      connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        callback({ array: null, id: null, success: true });
      });
    },

     cancelarSolicitud : async (connection, body, callback) => {
      let query = "";
      let query2 = "";
    
      if (body.quien == 'alumno') {
        // El que canceló fue el alumno
        query = `DELETE FROM alumno_solicitud WHERE solicitud_id = ${body.solicitud_id}`;
        query2 = `DELETE FROM solicitud WHERE solicitud_id = ${body.solicitud_id}`;
        console.log("Canceló el alumno");
        console.log(query);
        console.log(query2);
      } else {
        //El que canceló fue el tutor
        console.log("Canceló el tutor");
        query = `UPDATE solicitud SET tutor_id = NULL, solicitud_fecha_programacion = NULL, solicitud_lugar = NULL, 
        solicitud_rechazados = CONCAT_WS(',', IFNULL(solicitud_rechazados, ''), '${body.tutor_id}')
        WHERE solicitud_id = ${body.solicitud_id}`;
        console.log(query);
      }
    
      try {
        await connection.promise().query(query);
        if (query2) {
          await connection.promise().query(query2);
        }
        callback({ array: null, id: null, success: true });
      } catch (error) {
        callback({
          array: null,
          id: null,
          success: false,
          err: JSON.stringify(error),
        });
      }
    },  



    
    programarSolicitud: (connection,body, callback) => {
      //console.log("Llega: "+body.solicitud_fecha);
      //let query = "insert into alumno_solicitud (alumno_id,solicitud_id,alumno_encargado,alumno_asistencia) VALUES ("+alumno_id+","+solicitud_id+",0,0)";
      let query = "UPDATE solicitud SET solicitud_fecha_programacion = '"+body.fecha_programacion+"', solicitud_lugar = '"+body.lugar+"' WHERE solicitud_id = "+body.solicitud_id;
      console.log(query);
      connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        callback({ array: null, id: null, success: true });
      });
    },


    //PETICIONES DE CYNTHIA
    alumnosInvitados: (connection,body, callback) => {
      //console.log("Llega: "+body.solicitud_fecha);
      //let query = "insert into alumno_solicitud (alumno_id,solicitud_id,alumno_encargado,alumno_asistencia) VALUES ("+alumno_id+","+solicitud_id+",0,0)";
      let alumnosIds = body.alumnosIds;
      console.log(body);
      let query = `INSERT INTO alumno_solicitud (alumno_id, solicitud_id, alumno_encargado, alumno_asistencia) VALUES ?;`;
      const values = alumnosIds.map(alumnoId => [alumnoId, body.solicitud_id, 0, 0]);
      console.log(query);


      connection.query(query, [values], (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        callback({ array: null, id: null, success: true });
      });
    },

    informacionGeneral: (connection, idAlumno, callback) => {
      let query = `
      SELECT p.*, carr.*, cent.* FROM Alumno AS al INNER JOIN plan_estudio AS p ON al.plan_id = p.plan_id INNER JOIN carrera AS 
      carr ON carr.carrera_id = p.carrera_id 
      INNER JOIN centro AS cent ON carr.centro_id = cent.centro_id WHERE al.alumno_id = ${idAlumno};
      `;
     
      id = connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        //console.log("Results son: "+results);
        callback({ array: results, id: null, success: true });
      });
    },

    informacionTutor: (connection, idTutor, callback) => {
      let query = `
      SELECT t.tutor_id, t.alumno_id, t.tutor_promedio,
      t.tutor_fecha_inscripcion, t.tutor_fecha_finalizacion,
      t.tutor_programa, t.tutor_programa_numero,
      (
          SELECT AVG(COALESCE(s.asesoria_calificacion, 0))
          FROM solicitud s
          WHERE s.tutor_id = t.tutor_id AND s.solicitud_vigente = 0
      ) AS tutor_calificacion,
      t.tutor_vigente
      FROM tutor t
      WHERE t.tutor_id = ${idTutor};

      `;
     
      id = connection.query(query, (err, results) => {
        if (err) {
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        //console.log("Results son: "+results);
        callback({ array: results, id: null, success: true });
      });
    },

  };
  
