const controller ={};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM atencion', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO atencion set ?', [data], (err, rows) => {
            res.redirect('/');
        });
    })
};

controller.edit = (req, res) =>{
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM atencion WHERE id = ?', [id], (err, customer) =>{
            res.render('customer_edit', {
                data: customer[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE atencion set ? WHERE id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const { id }= req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM atencion WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    })
};

module.exports = controller;
