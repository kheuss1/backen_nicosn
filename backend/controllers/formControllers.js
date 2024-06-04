const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

exports.formContact = async (req, res) => {
    // Récupération des données du formulaire de contact depuis le corps de la requête
    const { name, email,tel , message } = req.body;
    // je veux recuperier le le parametre de url et le mettre sur une variable nom
    //

    const nom = req.subdomains[0];

    // Vérification si les données sont présentes
    if (!name || !tel || !email || !message) {
        return res.status(400).json({ message: "Données du formulaire incomplètes." });
    }

    // Création du transporteur de messagerie
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "contact@nicomaticsenegal.com", // Ajoutez votre adresse e-mail Gmail
            pass: "zfvmtjairsirkqbp", // Ajoutez votre mot de passe Gmail
        },
    });

    // Options de l'e-mail
    const mailOptions = {
        from: "contact@nicomaticsenegal.com", // Votre adresse e-mail
        to: "contact@nicomaticsenegal.com", // Adresse e-mail du destinataire
        cc: "", // CC, si nécessaire
        subject: "Formulaire de contact",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h1 style="color: #983716;">Nouveau message du formulaire du site ${nom} :</h1>
                <ul style="list-style-type: none; padding-left: 0;">
                    <li><strong>Nom complet:</strong> ${name}</li>
                    <li><strong>Téléphone:</strong> ${tel}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Message:</strong> ${message}</li>
                </ul>
            </div>
        `,
    };

    // Envoi de l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erreur lors de l'envoi du mail :", error);
            return res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail." });
        } else {
            console.log("Email envoyé :", info.response);
            return res.status(200).json({ message: "E-mail envoyé avec succès." });
        }
    });
};

exports.renseignement = (req, res) => {
    //Récupération des données du formulaire de contact depuis le corps de la requête
    const { firstName, lastName, phone, email,sujet, message } = req.body;
    // Vérification si les données sont présentes
    if (!firstName || !lastName || !phone || !email || !message) {
        return res.status(400).json({ message: "Données du formulaire incomplètes." });
    }   
    // Création du transporteur de messagerie
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "", // Ajoutez votre adresse e-mail Gmail
            pass: "", // Ajoutez votre mot de passe Gmail
        },
    });
    // Options de l'e-mail
    const mailOptions = {
        from: "", // Votre adresse e-mail
        to: "", // Adresse e-mail du destinataire
        cc: "", // CC, si nécessaire
        subject: "Formulaire de renseignement",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h1 style="color: #983716;">Nouveau message du formulaire de renseignement :</h1>
                <ul style="list-style-type: none; padding-left: 0;">
                    <li><strong>Nom complet:</strong> ${firstName} ${lastName}</li>
                    <li><strong>Téléphone:</strong> ${phone}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Sujet:</strong> ${sujet}</li>
                    <li><strong>Message:</strong> ${message}</li>
                </ul>
            </div>
        `,
        };
        // Envoi de l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Erreur lors de l'envoi du mail :", error);
                return res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail." });
            } else {
                console.log("Email envoyé :", info.response);
                return res.status(200).json({ message: "E-mail envoyé avec succès." });
            }
        });
        };



exports.rendezvous = (req, res) => {
     //Récupération des données du formulaire de contact depuis le corps de la requête
     const { firstName, lastName, phone, email,date, message } = req.body;
        // Vérification si les données sont présentes
        if (!firstName || !lastName || !phone || !email || !message) {
            return res.status(400).json({ message: "Données du formulaire incomplètes." });
        }
        // Création du transporteur de messagerie
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "", // Ajoutez votre adresse e-mail Gmail
                pass: "", // Ajoutez votre mot de passe Gmail
            },
        });
        // Options de l'e-mail
        const mailOptions = {
            from: "", // Votre adresse e-mail
            to: "", // Adresse e-mail du destinataire
            cc: "", // CC, si nécessaire
            subject: "Formulaire de prise de rendez-vous",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h1 style="color: #983716;">Nouveau message du formulaire de prise de rendez-vous :</h1>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li><strong>Nom complet:</strong> ${firstName} ${lastName}</li>
                        <li><strong>Téléphone:</strong> ${phone}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Date:</strong> ${date}</li>
                        <li><strong>Message:</strong> ${message}</li>
                    </ul>
                </div>
            `,
        };
        // Envoi de l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Erreur lors de l'envoi du mail :", error);
                return res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail." });
            } else {
                console.log("Email envoyé :", info.response);
                return res.status(200).json({ message: "E-mail envoyé avec succès." });
            }
        });
};