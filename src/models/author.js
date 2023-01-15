module.exports = (connection, DataTypes) => {
  const schema = {
    author: {
      type: DataTypes.STRING,
      unique: { args: true, msg: "Author already on the system"},
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Please enter an author" },
        notNull: { args: true, msg: "Please enter an author" },
      },
    },
  };
  const AuthorModel = connection.define("Author", schema);
  return AuthorModel;
};
