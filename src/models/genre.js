module.exports = (connection, DataTypes) => {
    const schema = { 
        genre: {
            type: DataTypes.STRING,
            unique: { args: true, msg: "Genre already on the system"},
            allowNull: false,
            validate: {
                notEmpty: { args: true, msg: "Please enter a genre" },
                notNull: { args: true, msg: "Please enter a genre" },
        },
    }
} 
const GenreModel = connection.define("Genre", schema);
return GenreModel
}