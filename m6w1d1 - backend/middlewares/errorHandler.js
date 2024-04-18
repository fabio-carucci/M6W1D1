// Funzione che gestisce gli errori di Bad Request (400)
exports.badRequestHandler = (err, req, res, next) => {
    if (err.status === 400) {
      res.status(400).send({
        success: false,
        message: err.message,
        errorsList: err.errorsList?.map((e) => e.msg) || [],
      });
    } else {
      next(err);
    }
  };

// Funzione che gestisce gli errori generici (quelli non catturati in precedenza)
exports.genericErrorHandle = (err, req, res, next) => {
    console.log("ERROR: ", err);
    res.status(500).json({ error: "Houston, abbiamo un problema sul server. Riprova più tardi!" });
  };