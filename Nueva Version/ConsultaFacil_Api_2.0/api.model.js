const { log } = require("console");
const conexion = require("./conexion");

module.exports = {
    
    citasDeUnDia: (connection, fecha,callback) => {
      let query = `SELECT
      p.Nombre,
      p.Edad,
      DATE_FORMAT(p.Nacimiento, '%Y-%m-%d') as Nacimiento,
      COUNT(c.ID_Cita) AS NumCitas
      FROM
          paciente p
      LEFT JOIN cita c ON p.ID_Paciente = c.ID_Paciente
      WHERE
          c.Fecha = '`+fecha+`' OR c.Fecha IS NULL
      GROUP BY
      p.ID_Paciente;`;


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
          es.Nombre_especialidad AS EspecialidadConsultorio
      FROM
          cita c
      JOIN paciente p ON c.ID_Paciente = p.ID_Paciente
      JOIN personal pe ON c.Id_personal = pe.Id_personal
      JOIN consultorio co ON pe.Id_consultorio = co.ID_Consultorio
      JOIN especialidad es ON co.Id_especialidad = es.Id_especialidad
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

    materiasMenoresTutor: (connection, idAlumno, callback) => {

      let query = `
      SELECT m.materia_id, m.materia_nombre
      FROM materia m
      JOIN materia_plan mp ON m.materia_id = mp.materia_id
      JOIN alumno a ON mp.semestre < a.alumno_semestre
      WHERE a.alumno_id = ${idAlumno} AND a.plan_id = mp.plan_id;      
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

    materiasTutor: (connection, idTutor, callback) => {

      let query = `
      SELECT m.materia_nombre, m.materia_id FROM  materia m 
      INNER JOIN Materia_Tutor mt ON m.materia_id = mt.materia_id WHERE mt.tutor_id = ${idTutor};      
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

    registrarTutor: (connection,body, callback) => {
      //console.log("Llega: "+body.solicitud_fecha);
      //let query = "insert into alumno_solicitud (alumno_id,solicitud_id,alumno_encargado,alumno_asistencia) VALUES ("+alumno_id+","+solicitud_id+",0,0)";
      let materias = body.materias

      const tutorData = {
        alumno_id: body.alumno_id,
        tutor_promedio: body.promedio,
        tutor_fecha_inscripcion: body.fecha_inscripcion,
        tutor_programa: body.programa,
        tutor_programa_numero: 1,
        tutor_calificacion: 0,
        tutor_vigente: 1,
      };


      connection.query("INSERT INTO tutor SET ?", tutorData, (err, results) => {
        const tutorId = results.insertId;

        // Insertar las materias asociadas al tutor en la tabla `materia_tutor`
        const materiaTutorData = materias.map((materia) => [
          tutorId,
          materia.materia_id,
          materia.promedio_materia,
        ]);

        console.log(materiaTutorData)
        connection.query(
          'INSERT INTO materia_tutor (tutor_id, materia_id, promedio_materia) VALUES ?',
          [materiaTutorData],
          (err, result) => {
            if (err) {
              console.error('Error al insertar las materias del tutor: ', err);
            } else {
              console.log('Materias del tutor insertadas correctamente.');
              callback({ array: null, id: null, success: true });
            }
          }
        );
      });
    },

    finalizadasAlumno: (connection, idAlumno, callback) => {

   

      let query2 = "SELECT m.materia_nombre, CONCAT(a.alumno_nombre, ' ', a.alumno_apellidos) AS tutor_nombre_completo, a.alumno_telefono, a.alumno_correo, s.solicitud_id, s.solicitud_descripcion, s.solicitud_tema, "+
      "s.solicitud_modalidad, s.solicitud_lugar, s.solicitud_urgencia, s.solicitud_fecha_programacion, s.solicitud_fecha FROM solicitud AS s INNER JOIN materia AS m ON s.materia_id = m.materia_id "+
      "LEFT JOIN tutor AS t ON s.tutor_id = t.tutor_id LEFT JOIN alumno AS a ON t.alumno_id = a.alumno_id WHERE s.solicitud_vigente = 0 AND EXISTS "+
      "(SELECT 1 FROM alumno_solicitud AS al WHERE al.solicitud_id = s.solicitud_id AND al.alumno_id = "+idAlumno+");";
      
      let query = `
      SELECT m.materia_nombre, CONCAT(a.alumno_nombre, ' ', a.alumno_apellidos) AS tutor_nombre_completo, 
      a.alumno_telefono, a.alumno_correo, s.solicitud_id, s.solicitud_descripcion, s.solicitud_tema, 
      s.solicitud_modalidad, s.solicitud_lugar, s.solicitud_urgencia, s.solicitud_fecha_programacion,
      s.solicitud_fecha FROM solicitud AS s 
      
      INNER JOIN materia AS m ON s.materia_id = m.materia_id 
      INNER JOIN tutor AS t ON s.tutor_id = t.tutor_id 
      INNER JOIN alumno AS a ON t.alumno_id = a.alumno_id
       WHERE s.solicitud_fecha_programacion IS NOT NULL AND EXISTS
      (SELECT 1 FROM alumno_solicitud AS al WHERE al.solicitud_id = s.solicitud_id 
      AND al.alumno_id = ${idAlumno} AND al.alumno_encargado = 1) AND s.solicitud_vigente = 0
      ;`;

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

    finalizadasTutor: (connection, idTutor, callback) => {

      /*let query = `
        SELECT *  FROM solicitud s
        INNER JOIN alumno_solicitud asol ON asol.solicitud_id = s.solicitud_id
        INNER JOIN alumno a ON a.alumno_id = asol.alumno_id 
        WHERE s.solicitud_vigente=0 AND s.tutor_id = ${idTutor} AND asol.alumno_encargado = 1
        ORDER BY solicitud_fecha_programacion DESC;
      `;*/

      let query2 = `
      SELECT s.*, m.materia_nombre, CONCAT(a.alumno_nombre, ' ', a.alumno_apellidos) AS tutor_nombre_completo, 
      a.alumno_correo, a.alumno_telefono FROM solicitud s 
      
      INNER JOIN materia m ON s.materia_id = m.materia_id
      
      INNER JOIN alumno_solicitud asol ON asol.solicitud_id = s.solicitud_id 
      INNER JOIN alumno a ON a.alumno_id = asol.alumno_id
      
      WHERE s.tutor_id = ${idTutor}
      AND s.solicitud_vigente = 0 AND asol.alumno_encargado = 1;`;


      let query = `
      SELECT s.*, m.materia_nombre, CONCAT(a.alumno_nombre, ' ', a.alumno_apellidos) AS tutor_nombre_completo, 
      a.alumno_correo, a.alumno_telefono FROM solicitud s 
      
      INNER JOIN materia m ON s.materia_id = m.materia_id
      
      INNER JOIN alumno_solicitud asol ON asol.solicitud_id = s.solicitud_id 
      INNER JOIN alumno a ON a.alumno_id = asol.alumno_id
      
      WHERE s.tutor_id = ${idTutor}
      AND s.solicitud_vigente = 0
      AND asol.alumno_encargado = 1;
      ;`;


     console.log(query2);
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

    test: (connection, id_Alumno,callback) => {
      //console.log("ALUMNO "+id_Alumno);
      //let query = "SELECT s.solicitud_id, s.solicitud_fecha, s.solicitud_urgencia, m.materia_nombre, s.solicitud_tema, s.solicitud_descripcion, s.solicitud_fecha_programacion, s.solicitud_lugar, s.solicitud_modalidad, s.solicitud_vigente, s.asesoria_evidencia, s.asesoria_calificacion, mt.tutor_id FROM solicitud s JOIN materia_tutor mt ON s.materia_id = mt.materia_id JOIN materia m ON mt.materia_id = m.materia_id WHERE mt.tutor_id = 1 AND EXISTS (SELECT 1 FROM Alumno WHERE alumno_id = "+ id_Alumno+");"
      let query = "SELECT * FROM solicitud ORDER BY solicitud_id DESC LIMIT 1;";
    //"SELECT * FROM Alumno WHERE alumno_id = "+id_Alumno;
      //let query = "select id from administradores where usuario ='lalodavilac9'";
      console.log("pre query");
      console.log(query);
      connection.query(query, (err, results) => {
        if (err) {
          console.log(err);
          callback({
            array: null,
            id: null,
            success: false,
            err: JSON.stringify(err),
          });
          return;
        }
        console.log("Results son: " + results);
        callback({ array: results, id: null, success: true });
      });
    },

    finalizarAsesoria: (connection,body, callback) => {
      //console.log("Llega: "+body.solicitud_fecha);
      //let query = "insert into alumno_solicitud (alumno_id,solicitud_id,alumno_encargado,alumno_asistencia) VALUES ("+alumno_id+","+solicitud_id+",0,0)";
     
      let query = `UPDATE solicitud SET solicitud_vigente = 0,  asesoria_evidencia = '${body.evidencia}' WHERE solicitud_id = ${body.solicitud_id}`;
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
  };
  
