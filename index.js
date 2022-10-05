const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cookieParser = require("cookie-parser"); 
const session = require("express-session"); 
const nodemailer = require("nodemailer");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true, 
  })
);
app.use(
  session({
    key: "userId", //name of the cookie
    secret: "subscribe",
    resave: true,
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 24, //time that cookie survive 48h
    },
  })
);
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "@ibti11012003",
  database: "projet_data",
});
app.use (cors () ) ;
app.use (express.json()) ;

/*****************************************************************************************************/
/****************        Pour la tab des switchs            *****************************************/
/****************************************************************************************************/

//Recuperer la lise des switchs
app.get("/api/getSwitchs", (req, res) => {
  db.query(
    "SELECT * FROM projet_data.tab_switchs , projet_data.liste_locaux where (tab_switchs.local=liste_locaux.id_local and Etat_switch!='Reformé')",
    (error, result) => {
      res.send(result);
    }
  );
});

//Ajouter un  switch
app.post("/api/AddSwitch", (req, rep) => {
  console.log(req.body);
  const N_inventaire = req.body.N_inventaire;
  const N_serie = req.body.N_serie;
  const modele = req.body.modele;
  const marque = req.body.marque;
  const DMAC = req.body.DMAC;
  const date_d_achat = req.body.date_d_achat;
  const Nombre_de_ports_FE = req.body.Nombre_de_ports_FE;
  const Nombre_de_ports_GE = req.body.Nombre_de_ports_GE;
  const Nombre_de_ports_SFP = req.body.Nombre_de_ports_SFP;
  const Nombre_de_ports_SFP_plus = req.body.Nombre_de_ports_SFP_plus;
  db.query(
    "INSERT INTO `projet_data`.`tab_switchs` ( `nom_switch`,`local`, `marque`, `modele`, `N_inventaire`, `N_serie`, `DMAC`, `date_d_achat`, `Nombre_de_ports_FE`, `Nombre_de_ports_GE`, `Nombre_de_ports_SFP`, `Nombre_de_ports_SFP_plus`, `Etat_switch`,`Armoire`)  VALUES (?,0,?,?,?,?,?,?,?,?,?,?,'au magazin','Indefinie')",
    [
      N_inventaire,
      marque,
      modele,
      N_inventaire,
      N_serie,
      DMAC,
      date_d_achat,
      Nombre_de_ports_FE,
      Nombre_de_ports_GE,
      Nombre_de_ports_SFP,
      Nombre_de_ports_SFP_plus,
    ],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        rep.send(" Valeurs inserer ");
        var i = 0;

        // insertion des ports F-E
        while (Nombre_de_ports_FE > i) {
          db.query(
            "INSERT INTO `projet_data`.`tab_ports` (`SwitchPort`, `Type_Port`, `N_port`, `Etat_Port`) VALUES (?, 'FE', ?, 'libre')",
            [N_inventaire, i + 1],
            (err, res) => {
              if (err) {
                console.log(err); 
              } else {
                console.log("ports F-E  inserés");
              } 
            }
          );
          i++;
        }

        // insertion des ports G-E
        i = 0;
        while (i < Nombre_de_ports_GE) {

          db.query(
            "INSERT INTO `projet_data`.`tab_ports` (`SwitchPort`, `Type_Port`, `N_port`, `Etat_Port`) VALUES (?,'GE', ?, 'libre')",
            [N_inventaire, i + 1],
            (err, res) => {
              if (err) {
                console.log(err); 
              } else {
                console.log("ports G-E  inserés ");
              } 
            }
          );
          i++;
        }

        // insertion des ports SFP
        i = 0;
        while (i < Nombre_de_ports_SFP) {
          
          db.query(
            "INSERT INTO `projet_data`.`tab_ports` (`SwitchPort`, `Type_Port`, `N_port`, `Etat_Port`) VALUES (?,'SFP', ?, 'libre')",
            [N_inventaire, i + 1],
            (err, res) => {
              if (err) {
                console.log(err); 
              } else {
                console.log("ports SFP  inserés ");
              } 
            }
          );
          i++;
        }

        // insertion des ports SFP+
        i = 0;
        while (i < Nombre_de_ports_SFP_plus) {
          db.query(
            "INSERT INTO `projet_data`.`tab_ports` (`SwitchPort`, `Type_Port`, `N_port`, `Etat_Port`) VALUES (?,'SFP+', ?, 'libre')",
            [N_inventaire, i + 1],
            (err, res) => {
              if (err) {
                console.log(err); 
              } else {
                console.log("ports SFP+  inserés");
              } 
            }
          );
          i++;
        }
      }
    }
  );
});

/*****************************************************************************************************/
/****************        les statistiques                   *****************************************/
/****************************************************************************************************/

/***le nombres de ports pour chaque VLAN */
app.get("/api/nombre_ports", (req, rep) => {
  db.query(
    "SELECT  COUNT(N_port) as nb_port FROM tab_ports GROUP BY VLAN ",
    (err, result) => {
      if (err) {
        console.log(err); 
      } else rep.send(result); 
    }
  );
});

/*************le nombre de ports selon l'état de port ***************/
app.get("/api/ETAT_PORT", (req, res) => {
  db.query(
    "SELECT Etat_Port, COUNT(IdPort) as nbr_ports FROM tab_ports GROUP BY Etat_Port   ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        
        res.send(result);
      }
    }
  );
});

//**************************le nombre des switchs pour chaque état *************/
app.get("/api/ETAT_SWITCH", (req, res) => {
  db.query(
    "SELECT Etat_switch, COUNT(*) as nbr_switches FROM tab_switchs GROUP BY Etat_switch   ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
      
        res.send(result);
      }
    }
  );
});

//**************************le nombre des switchs par bloc *************************************** */
app.get("/api/nbr_switches", (req, res) => {
  db.query(
    "SELECT Nom_bloc, COUNT( distinct nom_switch) as nbr_switches from liste_bloc , tab_switchs WHERE (local in (select id_local from liste_locaux where bloc = Nom_bloc)) GROUP BY Nom_bloc  UNION SELECT Nom_bloc,0 as nbr_switches from liste_bloc   WHERE ( Nom_bloc not in ( select bloc from liste_locaux where ( id_local  in (select `local`  from tab_switchs )))) group by Nom_bloc",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        
        res.send(result);
      }
    }
  );
});

//**************************le nombre des switchs totale *************************************** */
app.get("/api/nbr_switches_total", (req, res) => {
  db.query(
    " SELECT Count(*) as nombreTotal  FROM tab_switchs ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        
        res.send(result);
      }
    }
  );
});

/*****************************************************************************************************/
/****************        Pour la page VLAN                  *****************************************/
/****************************************************************************************************/

// recuperer les Vlans
app.get("/api/getVlans", (req, res) => {
  const sqlGet = "SELECT * FROM tab_vlan ORDER BY NumVLAN ";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

//recuperer les  noms de VLAN
app.get("/api/getNomVlans", (req, res) => {
  const sqlGet = "SELECT NomVLAN FROM tab_vlan ORDER BY NumVLAN ";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

// recuperer les VLANS avec le nombre du switchs et nombre de ports  pour chaque Vlan
app.get("/api/getVlansDetails", (req, res) => {
  const sqlGet =
    "select  NomVLAN ,IP,Masque,NumVLAN, count( distinct IdPort)as NbrPorts ,count( distinct switch)as NbrSwitch from  tab_vlan,tab_ports ,vlan_switch where ((tab_vlan.NomVLAN =tab_ports.VLAN )and (tab_vlan.NomVLAN=vlan_switch.VLAN)) group by tab_vlan.NomVLAN union select NomVLAN ,IP,Masque,NumVLAN, count( distinct IdPort)as NbrPorts ,0 as NbrSwitch from  tab_vlan,tab_ports ,vlan_switch where ((tab_vlan.NomVLAN =tab_ports.VLAN ) and NomVLAN not in (select VLAN from vlan_switch ))group by tab_vlan.NomVLAN union select NomVLAN ,IP,Masque,NumVLAN, 0 as NbrPorts ,count( distinct switch) as NbrSwitch from  tab_vlan,tab_ports ,vlan_switch where ((tab_vlan.NomVLAN =vlan_switch.VLAN ) and NomVLAN not in (select VLAN from tab_ports where VLAN is not null))group by tab_vlan.NomVLAN Union select NomVLAN ,IP,Masque,NumVLAN, 0 as NbrPorts,  0 as NbrSwitch from  tab_vlan where ((NomVLAN not in ( select VLAN from tab_ports where VLAN is not null)) and(NomVLAN not in ( select VLAN from vlan_switch where VLAN is not null)) )  ; ";
     db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

// recuperer les Vlans avec id
app.get("/api/getVlanNom/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM tab_vlan WHERE NomVLAN=? ";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// recuperer Vlan Avec le NumVLAN
app.get("/api/getVlanNum/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM tab_vlan WHERE NumVLAN=? ";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// recuperer Vlan Avec le IP
app.get("/api/getVlanIP/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM tab_vlan WHERE IP=? ";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// recuperer Vlan selon la recherche multiple
app.get("/api/getVlanRech/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet =
    "SELECT * FROM tab_vlan WHERE NomVLAN  LIKE ? or IP LIKE ? or NumVLAN LIKE ? ; ";
  db.query(
    sqlGet,
    ["%" + id + "%", "%" + id + "%", "%" + id + "%"],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

// recuperer Vlan selon la recherche multiple avec details
app.get("/api/getVlanRechDetails/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet =
    "select NomVLAN ,IP,Masque,NumVLAN, count( distinct IdPort)as NbrPorts ,count( distinct switch)as NbrSwitch from  tab_vlan,tab_ports ,vlan_switch where ((tab_vlan.NomVLAN =tab_ports.VLAN )and (tab_vlan.NomVLAN=vlan_switch.VLAN)and (NomVLAN  LIKE ? or IP LIKE ? or NumVLAN LIKE ?)) group by tab_vlan.NomVLAN union select NomVLAN ,IP,Masque,NumVLAN, count( distinct IdPort)as NbrPorts ,0 as NbrSwitch from  tab_vlan,tab_ports ,vlan_switch where ((tab_vlan.NomVLAN =tab_ports.VLAN ) and NomVLAN not in (select VLAN from vlan_switch )and (NomVLAN  LIKE ? or IP LIKE ? or NumVLAN LIKE ?))group by tab_vlan.NomVLAN  union select NomVLAN ,IP,Masque,NumVLAN, 0 as NbrPorts ,count( distinct switch) as NbrSwitch from  tab_vlan,tab_ports ,vlan_switch where ((tab_vlan.NomVLAN =vlan_switch.VLAN ) and NomVLAN not in (select VLAN from tab_ports)and (NomVLAN  LIKE ? or IP LIKE ? or NumVLAN LIKE ?))group by tab_vlan.NomVLAN Union select NomVLAN ,IP,Masque,NumVLAN, 0 as NbrPorts,  0 as NbrSwitch from  tab_vlan where (NomVLAN not in ( select VLAN from tab_ports) and(NomVLAN not in ( select VLAN from vlan_switch ))and (NomVLAN  LIKE ? or IP LIKE ? or NumVLAN LIKE ?) )   ; ";
  db.query(
    sqlGet,
    [
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

//Ajouter un Vlan
app.post("/AjouterVlan", (req, res) => {
  console.log("body of ajouter vlan", req.body);
  const { NomVLAN, NumVLAN, IP, Masque } = req.body;
  const sqlInsert =
    "INSERT INTO tab_vlan (NomVLAN, NumVLAN, IP, Masque ) Values (? , ?  , ? , ?  )";
  db.query(sqlInsert, [NomVLAN, NumVLAN, IP, Masque], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send("VALAN AJOUTée AVEC SUCCES ");
    }
  });
});

//Modifier un Vlan
app.put(`/EditVlan/:id`, (req, res) => {
  console.log("modification du VLAN ", req.body);
  const { id } = req.params;
  const { NomVLAN, NumVLAN, IP, Masque } = req.body;
  const sqlUpdate =
    "Update tab_vlan  Set NomVLAN=? , NumVLAN=?, IP= ?,  Masque =?  Where NomVlAN= ?";
  db.query(sqlUpdate, [NomVLAN, NumVLAN, IP, Masque, id], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send("VALAN Modifié AVEC SUCCES ");
    }
  });
});

//Supprimer un Vlan
app.delete(`/SuppVlan/:id`, (req, res) => {
  console.log("suppression  du VLAN ", req.body);
  const { id } = req.params;
  const sqlRemove = "DELETE FROM tab_vlan   Where NomVlAN= ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send("VALAN supprimer AVEC SUCCES ");
    }
  });
});

/*****************************************************************************************************/
/****************        Pour la page Locaux                *****************************************/
/****************************************************************************************************/
// recuperer les blocs
app.get("/api/getBlocs", (req, res) => {
  const sqlGet =
    "select distinct Nom_Bloc , Nombre_Etages , count(distinct N_inventaire) as NbrSwitchs from  liste_bloc ,tab_switchs where (tab_switchs.`local` in (select id_local from liste_locaux where bloc=liste_bloc.Nom_Bloc)) group by Nom_Bloc union select distinct Nom_Bloc , Nombre_Etages , 0  as NbrSwitchs from  liste_bloc ,tab_switchs where ((tab_switchs.`local` not in (select id_local from liste_locaux where bloc=liste_bloc.Nom_Bloc))and (Nom_Bloc not in (select bloc from liste_locaux where id_local in (select `local` from tab_switchs)))) group by Nom_Bloc ; ";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//recuperer les salles

app.get("/api/getLocaux", (req, res) => {
  const sqlGet = "SELECT ALL * FROM liste_locaux where salle!='magazin' ORDER BY   bloc , etage ; ";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

//recuperer un bloc avec son nom
app.get("/api/getBloc/:id", (req, res) => {
  console.log("Nom bloc choisi ", req.params.Nom_Bloc);
  const { id } = req.params;
  console.log(id);

  const sqlGet = "SELECT * FROM liste_bloc WHERE Nom_Bloc=? ";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

//Renommer un Bloc avec son nom
app.put(`/api/putBloc/:id`, (req, res) => {
  const { id } = req.params;

  const { New_Nom } = req.body;

  const sqlUpdate = "UPDATE  liste_bloc SET Nom_Bloc=? WHERE Nom_Bloc=? ";
  db.query(sqlUpdate, [New_Nom, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

//recuperer une salle
app.get("/api/getSalle/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sqlGet = "SELECT * FROM liste_locaux WHERE id_local=? ";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

//Renommer un Bloc
app.put(`/api/putSalle/:id`, (req, res) => {
  const { id } = req.params;
  const { New_Nom } = req.body;

  const sqlUpdate = "UPDATE  liste_locaux SET Salle=? WHERE id_local=? ";
  db.query(sqlUpdate, [New_Nom, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// Controle d'existance pour les chapms du switch *****************************
// controle n° d'inventaire
app.get("/api/getSwitchN/:id", (req, res) => {
  const { id } = req.params;
  console.log("id = ", id);
  const sqlGet = "SELECT * FROM projet_data.tab_switchs WHERE N_inventaire=?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// Controle dmac
app.get("/api/getSwitchDMAC/:id", (req, res) => {
  const { id } = req.params;
  console.log("id = ", id);
  ////console.log("id du vlan a modifier ",id);
  const sqlGet = "SELECT * FROM projet_data.tab_switchs WHERE DMAC=?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// recuperer les switch selon la recherche mmultiple
app.get("/api/getSwitchRech/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet =
    "SELECT * FROM projet_data.tab_switchs , projet_data.liste_locaux where (tab_switchs.local=liste_locaux.id_local) and( nom_switch LIKE ? or N_inventaire LIKE ? or modele LIKE ? or N_serie LIKE ? OR salle like ?) ;";
  db.query(
    sqlGet,
    [
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
      "%" + id + "%",
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

//Recuperer la lise des VLANS
app.get("/api/getVLANS", (req, res) => {
  db.query("SELECT NomVLAN  FROM projet_data.tab_vlan ", (error, result) => {
    res.send(result);
  });
});

// recherche un switch par la prise  ainsi que le ports correspondant 
app.put("/api/getSwitchRechPrise", (req, res) => {
   
  const rechPrise=req.body.rechPrise;
  const rechSalle=req.body.rechSalle;
  const sqlGet = "SELECT *   FROM   tab_ports ,tab_switchs , liste_locaux  where (((tab_switchs.local=liste_locaux.id_local) and( N_inventaire in (SELECT SwitchPort from tab_ports where  (LocalPrise in (Select id_local from liste_locaux where salle like ?  ))))and (Prise like ?)) and ((IdPort in (SELECT IdPort from tab_ports where  (LocalPrise in (Select id_local from liste_locaux where salle like? and (Prise like ?) ))))));  ";
  db.query(sqlGet,["%"+rechSalle+"%","%"+rechPrise+"%" ,"%"+rechSalle+"%","%"+rechPrise+"%"], (error, result) => {
      if(error){
          console.log(error);
      }
      res.send(result);
      console.log(" rep Prise ",result);
  });
});

/**************** Login *************************** */
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  
  const role = req.body.role;
  const nom = req.body.nom ; 
  const prenom= req.body.prenom;
  db.query(
    "INSERT INTO accounts (username,password,email,role,nom,prenom) VALUES (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE email = email",
    [username, password, email, role,nom,prenom],
    (err, result) => {
      console.log(err);
      if (err) { res.send(err);}
      else{
        var mail = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'suiviswitch@gmail.com',
              pass: 'suivideswitch' 
          }
      });
   
      var mailOptions = {
          from: 'suiviswitch@gmail.com',
          to: email,
          subject: 'Application suivi switch',
          html: `<p> utiliser ce  <a href=http://localhost:3000/Signin >lien</a> pour connecter a votre compte en utilisant le nom d'utilsateur ${username} et le mot de passe ${ password}  veuillez changer votre mot de passe</p>`
   
      };
   
      mail.sendMail(mailOptions, function(error, info) {
          if (error) { 
              console.log(1);
              res.send({ message: 'une erreur s est produit veuillez réessayer' });
          } else {
              console.log(0);
   res.send({ message: "utilisateur ajouté avec succes" });
              res.send({ message: 'un mail est envoyé a l utilisateur ' });
          }
     });
     
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.nomuser;
  const password = req.body.password;
  db.query(
    "SELECT * FROM accounts WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
     
      if (err) {
        console.log(err);
        res.send({ err: err });
      }
      else {
        console.log(result.length);
        if (result.length === 0) {
          if (res) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Incorrect Username and/or Password!" });
          }
        } else {
          res.send({ message: "cet utilisateur nexiste pas " });
        }
      }
    }
  );
});


app.post('/changer_mtps_email', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("UPDATE accounts SET password=? where email=?", [password, email], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ message: 'mot de passe modifié avec succées' });

        }

    });
    });


app.get("/affich_users", (req, res) => {
  db.query("SELECT * FROM accounts;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/affich_users/:id", (req, res) => {
  db.query("SELECT * FROM accounts;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



// Controle d'existance pour les chapms du switch *****************************
// controle du username
app.get("/affich_usersUsername/:id", (req, res) => {
  const { id } = req.params;
  console.log("id = ", id);
  const sqlGet = "SELECT * FROM accounts WHERE username = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// Controle email
app.get("/affich_usersUsername/:id", (req, res) => {
  const { id } = req.params;
  console.log("id = ", id);
  const sqlGet = "SELECT * FROM accounts WHERE email = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.post("/logout", (req, res) => {
  req.session.loggedIn = false;
});
app.get("/login", (req, res) => {
  if (req.session.user) {
    // Output username
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    // Not logged in
    res.send({ loggedIn: false });
  }
  res.end();
});
app.post("/changer_mtps", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "UPDATE accounts SET password=? where username=?",
    [password, username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "mot de passe modifié avec succées" });
      }
    }
  );
});

//Supprimer un Vlan
app.delete(`/delete_user/:id`, (req, res) => {
  console.log("suppression  du VLAN ", req.body);
  const { id } = req.params;
  const sqlRemove = "DELETE FROM accounts   Where username = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send("utilisateur supprimer AVEC SUCCES ");
    }
  });
});

/************restaurer mot de passse  */
app.post('/restaurer', (req, res) => {
    const username = req.body.username;
    console.log("username  ",username);

    db.query('SELECT email FROM accounts WHERE username = ? ',
        [username],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send({ err: err })
            }  

            else {  
                if(result[0]){
                if (result[0].email.length > 0) {
                    console.log("hna " ,result[0].email, "hna ");
                    var email = result[0].email;
                    var mail = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'suiviswitch@gmail.com', 
                            pass: 'suivideswitch' 
                        }
                    });
                 
                    var mailOptions = {
                        from: 'suiviswitch@gmail.com',
                        to: email,
                        subject: 'Lien de modification mot de passe ',
                        html: `<p> utiliser ce  <a href=http://localhost:3000/reset_password/${email} >lien</a> pour modifier votre mot de passe</p>`
                 
                    };
                 
                    mail.sendMail(mailOptions, function(error, info) {
                        if (error) { 
                            console.log(1);
                            res.send({ message: 'une erreur sest produit veuillez réessayer' });
                        } else {
                            console.log(0);
                            console.log(result[0].email);

                            res.send({ message_success: 'vérifier votre mail un lien de restoration est envoyé  ' });
                        }
                    });
                
                }else {  
                    console.log('else');

                    res.send({ message: 'vérifier votre nom d utilisateur ' });
                }
            }
        else{  console.log('elsee');

        res.send({ message: 'nom utilisateur faux ! verifier le ! ' });}}
        });

});


app.post("/ajtbloc", (req, res) => {
  console.log(req.body);
  const blocname = req.body.blocname;
  const floarnbr = req.body.floarnbr;
  console.log(blocname);
  console.log(floarnbr);
  db.query(
    "INSERT INTO `liste_bloc`( `Nom_Bloc`, `Nombre_Etages`) VALUES (?,?)",
    [blocname, floarnbr],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values are sent");
      }
    }
  );
});

app.post("/ajtvlan/:id", (req, res) => {
  console.log(req.body);
  const vlanjt = req.body.vlanjt;
  const {id}=req.params;
  db.query(
    "INSERT INTO `vlan_switch`( `switch` , `VLAN`) VALUES (?,?)",
    [id, vlanjt],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});
app.put("/getswitch", (req, res) => {
  const name = req.body.name;
  db.query(
    "SELECT * FROM tab_switchs where nom_switch=?",
    [name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/deconnecter/:id", (req, res) => {
  const{id}=req.params;
  db.query(
    "update tab_switchs set Etat_switch='passif' where N_inventaire=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  db.query(
    "update tab_ports set Etat_port='libre', CascadeVers=NULL ,port_cascade=NULL where SwitchPort=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  db.query(
    "update tab_ports set Etat_port='libre', CascadeDe=NULL  where CascadeDe=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  db.query(
    "update vlan_switch set  VLAN=NULL , switch=NULL where switch=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});


app.put("/connecter/:id", (req, res) => {
  const {id}=req.params;
  
  db.query(
    "update tab_switchs set Etat_switch='actif' where N_inventaire=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  
});


app.put("/config", (req, res) => {
  const Bloc = req.body.Bloc;
  const floarnbr = req.body.floarnbr;
  const Nsalle = req.body.Nsalle;
  console.log(req.body);
  db.query(
    "SELECT id_local FROM liste_locaux where bloc=? and etage=? and salle=?",
    [Bloc, floarnbr, Nsalle],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        
      }
    }
  );
});


app.get("/listeport/:id", (req, res) => {
  const { id } = req.params;
  console.log("port sdu switch ", id);
  db.query(
    "SELECT * FROM tab_ports , liste_locaux where ((SwitchPort=?) and (tab_ports.LocalPrise=liste_locaux.id_local)) union SELECT IdPort,SwitchPort,N_port,VLAN,Type_Port,Etat_Port,CascadeVers,Prise,LocalPrise,CascadeDe,port_cascade , null as id_local , null as bloc ,null as etage , 'indefinie' as salle  FROM tab_ports ,liste_locaux where ((SwitchPort=?) and (tab_ports.LocalPrise is null));",
    [id,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
       
      }
    }
  );
});
app.post("/validation/:id", (req, res) => {
  const { id } = req.params;
  const idinsert = req.body.idinsert;
  const arm = req.body.arm;
  db.query(
    "update tab_switchs set local=? , Armoire=? where N_inventaire=?",
    [idinsert, arm, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values are sent");
      }
    }
  );
});
app.post("/deletvlan/:id", (req, res) => {
  const { id } = req.params;
  const idsupp = req.body.idsupp;
  console.log(req.body);
  db.query(
    "DELETE FROM vlan_switch where VLAN=? and switch=?",
    [idsupp,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values deleted ");
      }
    }
  );
});
app.put("/vlanswitch/:id", (req, res) => {
  const { id } = req.params;
  console.log("id ", id);
  db.query(
    "SELECT VLAN , COUNT(*) as nbr FROM tab_ports where SwitchPort=? and VLAN in (select VLAN from vlan_switch where switch=?)group by  VLAN  union SELECT VLAN , 0 as nbr FROM vlan_switch where switch=? and VLAN not in (select VLAN from tab_ports where SwitchPort=? and VLAN is not NULL) ",
    
    [id,id,id,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log("heeeey" ,result);
        
      }
    }
  );
});
app.put("/rename/:id", (req, res) => {
  const {id}=req.params;
  const newnom = req.body.newnom;
  db.query(
    "update tab_switchs set nom_switch=?  where N_inventaire=?",
    [newnom, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        
      }
    }
  );
});

app.put("/getlocal", (req, res) => {
  const idlocal = req.body.idlocal;

  db.query(
    "SELECT * FROM liste_locaux where id_local=?",
    [idlocal],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/sendbloc", (req, res) => {
  const tying = req.body.tying;

  db.query(
    "SELECT Nombre_Etages FROM  liste_bloc where Nom_Bloc=?",
    [tying],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/sendblocprise", (req, res) => {
  const prisebloc = req.body.prisebloc;

  db.query(
    "SELECT Nombre_Etages FROM  liste_bloc where Nom_Bloc=?",
    [prisebloc],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.put("/getsalle", (req, res) => {
  const Bloc = req.body.Bloc;
  const floar = req.body.floar;

  db.query(
    "SELECT salle FROM liste_locaux where bloc=? and etage=?",
    [Bloc, floar],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.put("/getsalle2", (req, res) => {
  const Bloc = req.body.Bloc;
  const saveetage = req.body.saveetage;

  db.query(
    "SELECT salle FROM liste_locaux where bloc=? and etage=?",
    [Bloc, saveetage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        
      }
    }
  );
});
app.put("/getsalleprise", (req, res) => {
  const blocprise = req.body.blocprise;
  const floarprise = req.body.floarprise;

  db.query( "SELECT salle FROM liste_locaux where bloc=? and etage=?",
    [blocprise, floarprise],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/blocs", (req, res) => {
  db.query("SELECT Nom_Bloc FROM liste_bloc  ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.get("/vlans/:id", (req, res) => {
  const {id}=req.params;
  db.query(
    "SELECT NomVLAN FROM tab_vlan  WHERE( (NomVLAN NOT IN (SELECT VLAN FROM vlan_switch WHERE switch= ? )) and (NomVLAN != 'default'))",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        
      }
    }
  );
});

app.put("/nbrports/:id", (req, res) => {
  const {id}=req.params;
  const vln=req.body.vln
  db.query(
   " SELECT VLAN , COUNT(*) as nbr FROM tab_ports where SwitchPort=? group by  VLAN  ",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result)
      }
    }
  );
});



app.get("/gettypeport", (req, res) => {
  db.query(
    "SELECT Etat_Port FROM liste_etat_port where Etat_Port NOT IN ( 'libre' , 'défectueux' , 'cascade' ) ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        
      }
    }
  );
});
app.get("/gettypesport", (req, res) => {
  db.query(
    "SELECT * FROM liste_etat_port " ,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        
      }
    }
  );
});


app.put('/reforme/:id',(req,res)=>{
  console.log("inside reforme ");
  const {id}=req.params;
  const idportreforme=req.body.idportreforme;
  console.log("inside reforme port ", idportreforme);
  db.query("update tab_ports set  VLAN=NULL , CascadeVers=NULL , CascadeDe=NULL , port_cascade=NULL , Etat_Port='défectueux' , Prise=NULL , LocalPrise=NULL  where IdPort=?",[idportreforme],(err,result)=>{
      if(err){
          console.log(err)
      }
      
      
  });
  db.query("update tab_ports set  VLAN=NULL , CascadeVers=NULL , CascadeDe=NULL , port_cascade=NULL , Etat_Port='libre' , Prise=NULL , LocalPrise=NULL  where CascadeDe=?",[id],(err,result)=>{
    if(err){
        console.log(err)
    }
    else{
      res.send(result);
    }
    
    
});
});
app.put('/debrancher/:id',(req,res)=>{
  const {id}=req.params;
  const valdebr=req.body.valdebr;
  console.log(req.body);
  db.query("update tab_ports set  VLAN=NULL , CascadeVers=NULL , CascadeDe=NULL , port_cascade=NULL , Etat_Port='libre' ,Prise=NULL , LocalPrise=NULL where IdPort=?",[valdebr],(err,result)=>{
      if(err){
          console.log(err)
      }
  });
 
  db.query("update tab_ports set  VLAN=NULL , CascadeVers=NULL , CascadeDe=NULL , port_cascade=NULL , Etat_Port='libre' where CascadeDe=?",[id],(err,result)=>{
    if(err){
        console.log(err)
    }
    else{
      res.send(result);
    }
});

});
app.post("/create", (req, res) => {
  console.log(req.body);

  const Nsalle = req.body.Nsalle;
  const floarnbr = req.body.floarnbr;
  const Bloc = req.body.Bloc;
  db.query(
    "INSERT INTO `liste_locaux`(  `bloc`, `etage`, `salle` ) VALUES (?,?,?)",
    [Bloc, floarnbr, Nsalle],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values are sent");
      }
    }
  );
});

app.post("/configportvlan", (req, res) => {
  const idport = req.body.idport;
  const typep = req.body.typep;
  const vlanp = req.body.vlanp;
  console.log(req.body);
  const concatination=req.body.concatination;
  const blocprise=req.body.blocprise
  const prise=req.body.prise;
  const floarnbrprise=req.body.floarnbrprise;
  const salleprise=req.body.salleprise;
  console.log(req.body);
  db.query(
    "update tab_ports set Etat_Port=? , VLAN=? , Prise=? , LocalPrise=(select id_local from liste_locaux where bloc=? and etage=? and salle=?) , CascadeDe=NULL , CascadeVers=NULL , port_cascade=NULL  where IdPort=?",
    [typep, vlanp , prise , blocprise , floarnbrprise, salleprise , idport],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values are sent");
      }
    }
  );
});

app.post("/cascade/:id", (req, res) => {
  const cascadevers = req.body.cascadevers;
  const portcascade = req.body.portcascade;
  const idport = req.body.idport;
  const typeofport = req.body.typeofport;
  const {id}=req.params;
  console.log ("le id port est : ", req.body.idport)
  db.query(
    "update tab_ports set CascadeVers=(select N_inventaire from tab_switchs where nom_switch=?) , port_cascade=? , Etat_Port='cascade' , VLAN=NULL , Prise=NULL , LocalPrise=NULL  where IdPort=?",
    [cascadevers, portcascade, idport],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  db.query(
    "update tab_ports set CascadeDe=? , Etat_Port='cascade' , VLAN=NULL , Prise=NULL , LocalPrise=NULL  where N_port=? and Type_Port=?  and SwitchPort=(select N_inventaire from tab_switchs where nom_switch=?)  ",
    [id, portcascade,typeofport, cascadevers],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else{
        res.send("values are sent");
      }
    }
  );
});
////////////////////////////////Les filtres/////////////////////////////////////////////////////////////

app.get("/SWITCHES_PAR_VLAN/:id", (req, res) => {
  const { id } = req.params;

  console.log(id);
  if (id !== "VLAN") {
    const sqlGet =
      "SELECT* FROM tab_switchs,liste_locaux where (tab_switchs.local=liste_locaux.id_local) AND nom_switch IN (SELECT DISTINCT switch from vlan_switch WHERE (VLAN=?)); ";
    db.query(sqlGet, id, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
        console.log("result ", result);
      }
    });
  }
});

app.get("/CHERCHER_SWITCHES_PAR_Etat_actifs", (req, rep) => {
  db.query(
    "SELECT* FROM tab_switchs,liste_locaux where tab_switchs.local=liste_locaux.id_local AND nom_switch IN (SELECT DISTINCT nom_switch from tab_switchs   WHERE (Etat_switch='actif')) ", // je peux faire nom_vlan=? or IP=?...
    (err, result) => {
      if (err) {
        console.log(err); 
      } else rep.send(result); 
    }
  );
});

app.get("/CHERCHER_SWITCHES_PAR_Etat_passifs", (req, rep) => {
  db.query(
    "SELECT* FROM tab_switchs,liste_locaux where tab_switchs.local=liste_locaux.id_local AND nom_switch IN (SELECT DISTINCT nom_switch from tab_switchs   WHERE (Etat_switch='passif')) ", // je peux faire nom_vlan=? or IP=?...
    (err, result) => {
      if (err) {
        console.log(err); 
      } else rep.send(result); 
    }
  );
});
app.get("/CHERCHER_SWITCHES_PAR_Etat_au_magazin", (req, rep) => {
  db.query(
    "SELECT* FROM tab_switchs,liste_locaux where tab_switchs.local=liste_locaux.id_local AND nom_switch IN (SELECT DISTINCT nom_switch from tab_switchs   WHERE (Etat_switch='au magazin')) ", // je peux faire nom_vlan=? or IP=?...
    (err, result) => {
      if (err) {
        console.log(err); 
      } else rep.send(result); 
    }
  );
});

app.get("/CHERCHER_SWITCHES_PAR_Etat_Reforme", (req, rep) => {
  db.query(
    "SELECT* FROM tab_switchs,liste_locaux where tab_switchs.local=liste_locaux.id_local AND nom_switch IN (SELECT DISTINCT nom_switch from tab_switchs   WHERE (Etat_switch='Reforme')) ", // je peux faire nom_vlan=? or IP=?...
    (err, result) => {
      if (err) {
        console.log(err); 
      } else rep.send(result);
    }
  );
});

app.get("/CHERCHER_SWITCHES_PAR_Etat/:id", (req, rep) => {
  const { id } = req.params;
  if (id !== "Etat") {
    db.query(
      "SELECT* FROM tab_switchs,liste_locaux where tab_switchs.local=liste_locaux.id_local AND nom_switch IN (SELECT DISTINCT nom_switch from tab_switchs   WHERE (Etat_switch=?)) ",
      id, 
      (err, result) => {
        if (err) {
          console.log(err); 
        } else rep.send(result); 
      }
    );
  }
});
app.get("/CHERCHER_SWITCHES_PAR_bloc", (req, rep) => {
  const bloc = req.body.bloc;

  db.query(
    "SELECT DISTINCT nom_switch  from tab_switchs   WHERE local IN (SELECT id_local from liste_locaux WHERE (bloc=?)) ",
    [bloc], 
    (err, result) => {
      if (err) {
        console.log(err); 
      } else rep.send(result); 
    }
  );
});

app.put("/FiltrePorts/", (req, res) => {
  const id=req.body.id
  const Portfiltre=req.body.Portfiltre;
  console.log(" id" ,id," ports" ,Portfiltre);
  console.log(id);
  if (Portfiltre !== "") {
    const sqlGet =
      "SELECT * FROM tab_ports , liste_locaux where ((SwitchPort=?) and (tab_ports.LocalPrise=liste_locaux.id_local)and  (Etat_Port =? ) ) union SELECT IdPort,SwitchPort,N_port,VLAN,Type_Port,Etat_Port,CascadeVers,Prise,LocalPrise,CascadeDe,port_cascade , null as id_local , null as bloc ,null as etage , 'indefinie' as salle  FROM tab_ports ,liste_locaux where ((SwitchPort=?) and (tab_ports.LocalPrise is null) and ( Etat_Port =? ));";
    db.query(sqlGet, [id,Portfiltre,id,Portfiltre], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
        console.log("result ", result);
      }
    });
  }
});
app.listen(5000, () => {
  console.log("Server is running on port 5000 ");
});