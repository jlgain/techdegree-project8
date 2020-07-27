'use strict';

// Module requires sequelize and moment JS lib
const Sequelize = require('sequelize');
const moment = require('moment');

// Module exports the initialized Book Model
module.exports = (sequelize) =>
{
    // Create and export a class named Book that extends Sequelize.Model base class
    class Book extends Sequelize.Model {
        // To change format of date
        publishedAt()
        {
            const date = moment(this.createdAt).format('MMM D, YYYY, h:mma');
            return date;
        }
    }

    // Call static class init() method on Book model to initialize and configure model
    // Defines a new table in the database
    Book.init(
        {
            // Set custom primary key
            id:
            {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            // Set the model attributes
            // Disallow null values for entries
            title:
            {
                type: Sequelize.STRING,
                allowNull: false,
                validate:
                {
                    notEmpty:
                    {
                        msg: 'Please provide a value for "Title"'
                    },
                    notNull:
                    {
                        msg: 'Please provide a value for "Title"'
                    }
                }
            },
            author:
            {
                type: Sequelize.STRING,
                allowNull: false,
                validate: 
                {
                    notNull: 
                    {
                        msg: 'Please provide a value for "Author"'
                    },
                    notEmpty: 
                    {
                        msg: 'Please provide a value for "Author"'
                    }
                }
            },
            genre: 
            {
                type: Sequelize.STRING,
                allowNull: false,
                validate: 
                {
                    is:
                    {
                        args: /^[a-zA-Z]*$/,
                        msg: '"Genre" must be letters only'
                    }
                }
            },
            year:
            {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate:
                {
                    is:
                    {
                        args: /^\d{4}$/,
                        msg: '"Year" must be an integer'
                    }
                }
            }
        },
        {
            // Set model options, and attach sequelize instance
            sequelize: sequelize,
        }
    );

    // Return Book model
    return Book;
}