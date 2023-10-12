const config = require("../config/auth.config");
const db = require("../models");
const Genome = db.genome;
const Role = db.role;


/*export const getGenome = async(req, res) => {
    try {
        const genomes = await Genome
            .find({})
            //.populate ("category")
            .limit(12)
            .sort({ createAt: -1 });

        res.status(200).send({
            success: true,
            genomes,
        });
    } catch (error) {
        console.log(error);
        res.status(500), send({
            success: false,
            message: "No result matches"
        })
    }
}*/

exports.searchGenome = async(req, res) => {
    let result = await Genome.find({
        "$or": [{
            gen_id: { $regex: req.params.key }
        }]
    })
    res.send(result)
        /*try {
            const {
                keyword
            } = req.params;

            const results = await Genome
                .find({
                    $or: [
                        { name: { $regex: keyword, $options: 'i' } },
                    ],
                })
            res.send(results);
        } catch (error) {
            console.log(error);
            res.status(400).send({
                success: false,
                message: "No result matches",
                error,
            });
        }*/
};
exports.createGenome = (req, res) => {
    //Validata request
    if (!req.body.gen_id) {
        res.status(400).send({ message: "Can not be empty!" });
        return;
    }
    //Create new genome
    const genome = new Genome({
        gen_id: req.body.gen_id,
        name: req.body.name,
        pos: req.body.pos
    });

    //Save new genome
    genome
        .save(genome)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error"
            });
        });
}

//show all List 
exports.showAllGene = (req, res) => {
    Genome.find()
        .then(genomes => res.json(genomes))
        .catch(err => res.json(err))
}

//update genome
exports.updateGene = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const gen_id = req.params.gen_id;

    Genome.findByIdAndUpdate(gen_id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update genome with gen_id = ${gen_id}.`
                });
            } else res.send({ message: "Genome was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating genome with gen_id = " + gen_id
            });
        });
};

// Delete a genome with the specified id in the request
exports.deleteGene = (req, res) => {
    const gen_id = req.params.gen_id;
    Genome.findByIdAndRemove(gen_id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete gene with id=${gen_id}.`
                });
            } else {
                res.send({
                    message: "Genome was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete genome with id=" + gen_id
            });
        });
};
/*function search_genomes() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('animals'); // doan nay thay the bang cach nhan biet du lieu
    
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].computedStyleMap.display="none";
        }
        else {
            message
        }
    }
}*/