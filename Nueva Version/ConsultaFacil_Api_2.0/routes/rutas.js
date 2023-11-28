const express = require("express");
const user = require("../api.model");
const connection = require("../conexion");
const { body, param, validationResult } = require("express-validator");
const { log } = require("console");
var router = express.Router();


router.get("/citasDeUnDia/:fecha", [], (req, res) => {
  const fecha = req.params.fecha;
  user.citasDeUnDia(connection, fecha,(data) => {
    res.json(data);
  });
});



router.get("/historicoConsultorio/:idConsultorio", [], (req, res) => {
  const idConsultorio = req.params.idConsultorio;
  user.historicoConsultorio(connection, idConsultorio,(data) => {
    res.json(data);
  });
});

router.get("/especialidadesConsultorio/:idConsultorio", [], (req, res) => {
    const idConsultorio = req.params.idConsultorio;
    user.especialidadesConsultorio(connection, idConsultorio,(data) => {
      res.json(data);
    });
  });
 
router.get("/personalConsultorio/:idConsultorio", [], (req, res) => {
    const idConsultorio = req.params.idConsultorio;
    user.personalConsultorio(connection, idConsultorio,(data) => {
        res.json(data);
    });
});

router.get("/solicitudes/:planId/:semestre", [], (req, res) => {
  //console.log("Desde antes: "+req.params.usuario);
  const idPlan = req.params.planId;
  const semestre = req.params.semestre;
  user.consultarMateriasParaSolicitud(connection,idPlan,semestre, (data) => {
    res.json(data);
  });
});

router.get("/solicitudesTutor/:idTutor", [], (req, res) => {
  //console.log("Desde antes: "+req.params.usuario);
  const idTutor = req.params.idTutor;
  user.solicitudesTutor(connection, idTutor,(data) => {
    res.json(data);
  });
});

router.get("/enProcesoTutor/:idTutor", [], (req, res) => {
  //console.log("Desde antes: "+req.params.usuario);
  const idTutor = req.params.idTutor;
  user.enProcesoTutor(connection, idTutor,(data) => {
    res.json(data);
  });
});

router.get("/estadoDeAgenda/:idConsultorio/:fecha", [], (req, res) => {
  //console.log("Desde antes: "+req.params.usuario);
  const idConsultorio = req.params.idConsultorio;
  const fecha = req.params.fecha;
  user.estadoDeAgenda(connection, idConsultorio,fecha,(data) => {
    res.json(data);
  });
});
  

/* router.post(
  "/nuevaSolicitud",
  [
    body("solicitud_fecha").not().isEmpty().isString(),
    body("solicitud_urgencia").not().isEmpty().isString(),
    body("solicitud_tema").not().isEmpty().isString(),
    body("solicitud_descripcion").not().isEmpty().isString(),
    body("solicitud_modalidad").not().isEmpty().isString()
  ],
  (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ success: false, err: JSON.stringify(errors) });
      return;
    }
    let body = req.body;
 
    let alumno_id = body.alumno_id;


    user.crearSolicitud(connection, body, alumno_id, (data) => {
      user.ultimaSolicitud(connection,alumno_id,(ultimaSolicitudData) =>{
        user.insertarAlumnoSolicitud(connection,alumno_id,ultimaSolicitudData.array[0].solicitud_id,(insertAlumnoData) =>{
          res.json(insertAlumnoData);
       });
     });
   });
  }
); */



router.post(
  "/configurarAgenda",
  (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ success: false, err: JSON.stringify(errors) });
      return;
    }
    let body = req.body;

    user.configurarAgenda(connection, body, (data) => {
      res.json(data);

    });
  }
);

router.post(
    "/agregarPersonal",
    (req, res) => {
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) });
        return;
      }
      let body = req.body;
  
      user.agregarPersonal(connection, body, (data) => {
        res.json(data);
  
      });
    }
  );

  router.post(
    "/darDeBajaPersonal",
    (req, res) => {
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) });
        return;
      }
      let body = req.body;
  
      user.darDeBajaPersonal(connection, body, (data) => {
        res.json(data);
  
      });
    }
  );

router.post(
  "/cancelarSolicitud",
  (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ success: false, err: JSON.stringify(errors) });
      return;
    }
    let body = req.body;
    
    
    user.cancelarSolicitud(connection, body, (data) => {
      res.json(data);

    });
  }
);

router.post(
  "/programarSolicitud",
  (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ success: false, err: JSON.stringify(errors) });
      return;
    }
    let body = req.body;
    
    
    user.programarSolicitud(connection, body, (data) => {
      res.json(data);

    });
  }
);


//PETICIONES DE CYNTHIA
router.post(
  "/alumnosInvitados",
  (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ success: false, err: JSON.stringify(errors) });
      return;
    }
    let body = req.body;
  
    user.alumnosInvitados(connection, body, (data) => {
      res.json(data);

    });
  }
);




router.get("/informacionGeneral/:idAlumno", [], (req, res) => {
  //console.log("Desde antes: "+req.params.usuario);
  const idAlumno = req.params.idAlumno;
  user.informacionGeneral(connection, idAlumno,(data) => {
    res.json(data);
  });
});

router.get("/informacionTutor/:idTutor", [], (req, res) => {
  //console.log("Desde antes: "+req.params.usuario);
  const idTutor = req.params.idTutor;
  user.informacionTutor(connection, idTutor,(data) => {
    res.json(data);
  });
});

router.get("/materiasMenores/:idAlumno", [], (req, res) => {
  //console.log("Desde antes: "+req.params.usuario);
  const idAlumno = req.params.idAlumno;
  user.materiasMenoresTutor(connection, idAlumno,(data) => {
    res.json(data);
  });
});

router.get("/materiasTutor/:idTutor", [], (req, res) => {
  //console.log("Desde antes: "+req.params.usuario);
  const idTutor = req.params.idTutor;
  user.materiasTutor(connection, idTutor,(data) => {
    res.json(data);
  });
});



router.post(
  "/registrarTutor",
  (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ success: false, err: JSON.stringify(errors) });
      return;
    }
    let body = req.body;
    
    
    user.registrarTutor(connection, body, (data) => {
      res.json(data);

    });
  }
);


router.get("/finalizadasAlumno/:idAlumno", [], (req, res) => {
  //console.log("Desde antes: "+req.params.usuario);
  const idAlumno = req.params.idAlumno;
  user.finalizadasAlumno(connection, idAlumno,(data) => {
    res.json(data);
  });
});

router.get("/finalizadasTutor/:idTutor", [], (req, res) => {
  //console.log("Desde antes: "+req.params.usuario);
  const idTutor = req.params.idTutor;
  user.finalizadasTutor(connection, idTutor,(data) => {
    res.json(data);
  });
});


router.post(
  "/finalizarAsesoria",
  (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ success: false, err: JSON.stringify(errors) });
      return;
    }
    let body = req.body;
    
    
    user.finalizarAsesoria(connection, body, (data) => {
      res.json(data);

    });
  }
);


  /*const responseData = {
          alumno_id: body.alumno_id,
          ultimaSolicitud: ultimaSolicitudData
        };*/
  

module.exports = router;
