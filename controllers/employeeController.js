const employeeModel = require('../models/employee');

// Create and Save a new mployee
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstname && !req.body.lastname && !req.body.phone) {
        res.status(400).send({ message: "Content cannot be empty!" });
    }
    
    const employee = new employeeModel({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone
    });
    
    await employee.save().then(data => {
        res.send({
            message: "Employee created successfully!!",
            employee: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating employee"
        });
    });
};

// Retrieve all employees from the database.
exports.findAll = async (req, res) => {
    try {
        const employee = await employeeModel.find();
        res.status(200).json(employee);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single Employee with an id
exports.findOne = async (req, res) => {
    try {
        const employee = await employeeModel.findById(req.params.id);
        res.status(200).json(employee);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a employee by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }
    const id = req.params.id;
    
    await employeeModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Employee not found.`
            });
        }else{
            res.send({ message: "Employee updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await employeeModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Employee not found.`
          });
        } else {
          res.send({
            message: "Employee deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};
