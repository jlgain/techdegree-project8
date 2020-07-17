'use strict';

// Module requires sequelize and moment JS lib
const Sequelize = require('sequelize');
const moment = require('moment');

// Module exports the initialized Book Model
module.export = (sequelize) =>
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
                    notNull: 
                    {
                        msg: 'Please provide a value for "Genre"'
                    },
                    notEmpty: 
                    {
                        msg: 'Please provide a value for "Genre"'
                    }
                }
            },
            year:
            {
                type: Sequelize.DATEONLY,
                allowNull: false,
                validate:
                {
                    notNull:
                    {
                        msg: 'Please provide a value for "Year"'
                    },
                    isAfter:
                    {
                       args: '1454-01-01',
                       msg: 'Please provide a value on or after "1454-01-01" for "Year"' 
                    }
                }
            }
        },
        {
            // Set model options, and attach sequelize instance
            sequelize: sequelize,
            // Enable soft deletes to mark record as deleted instead of physically removing it
            paranoid: true
        }
    );

    // Return Book model
    return Book;
}