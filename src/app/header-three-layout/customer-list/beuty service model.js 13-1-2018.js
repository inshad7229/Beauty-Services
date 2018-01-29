var Sequelize = require('sequelize');
var env = "dev";
var config = require('../config.json')[env];
var password = config.password ? config.password : null;
var sequelize = new Sequelize(
    config.database,
    config.user,

    config.password, {
        logging: console.log,
          dialect: 'mysql',
        define: {
            timestamps: false
        }
    }
);

exports.Saloon= sequelize.define('saloon',{
                                    saloon_name: {type: Sequelize.STRING},
                                    name: {type: Sequelize.STRING},
                                    email:{type: Sequelize.STRING},
                                    contact_number:{type: Sequelize.STRING},
                                    image:{type: Sequelize.STRING},
                                    password:{type: Sequelize.STRING},
                                    decoded_password:{type: Sequelize.STRING},
                                    city:{type: Sequelize.STRING},
                                    latitude:{type: Sequelize.STRING},
                                    longitude:{type: Sequelize.STRING},
                                    opening_time:{type: Sequelize.STRING},
                                    closing_time:{type: Sequelize.STRING},
                                    description_eng:{type: Sequelize.STRING},
                                    description_arb:{type: Sequelize.STRING},
                                    cardPay:{type: Sequelize.STRING},
                                    category:{type: Sequelize.STRING},
                                    services:{type: Sequelize.STRING},
                                    created_at:{type:Sequelize.STRING},
                                    price_range:{type:Sequelize.STRING},
                                    updated_at:{type:Sequelize.STRING}
                                },
                                {
                                    tableName:'saloon'
                                }
                            )

exports.Customer= sequelize.define('customer',{
                                    first_name: {type: Sequelize.STRING},
                                    last_name: {type: Sequelize.STRING},
                                    email:{type: Sequelize.STRING},
                                    contact_number:{type: Sequelize.STRING},
                                    password:{type: Sequelize.STRING},
                                    city:{type: Sequelize.STRING},
                                    image:{type: Sequelize.STRING},
                                    gender:{type: Sequelize.STRING},
                                    status:{type:Sequelize.STRING},
                                    created_at:{type:Sequelize.STRING},
                                    updated_at:{type:Sequelize.STRING}
                                },
                                {
                                    tableName:'customer'
                                }
                            )


exports.Category= sequelize.define('category',{
                                    category_eng: {type: Sequelize.STRING},
                                    category_arb: {type: Sequelize.STRING},
                                    image:{type: Sequelize.STRING},
                                    status:{type:Sequelize.STRING},
                                    created_at:{type:Sequelize.STRING},
                                    updated_at:{type:Sequelize.STRING}
                                   
                                },
                                {
                                    tableName:'category'
                                }
                            )

exports.Services= sequelize.define('services',{
                                    category_id:{type: Sequelize.STRING},
                                    services_eng: {type: Sequelize.STRING},
                                    services_arb: {type: Sequelize.STRING},
                                    image:{type: Sequelize.STRING},
                                    status:{type:Sequelize.STRING},
                                    created_at:{type:Sequelize.STRING},
                                    updated_at:{type:Sequelize.STRING}
                                   
                                },
                                {
                                    tableName:'services'
                                }
                            )

exports.SaloonServices= sequelize.define('saloonservices',{
                                    saloon_id:{type: Sequelize.STRING},
                                    category_id:{type: Sequelize.STRING},
                                    service_id:{type: Sequelize.STRING},
                                    cost_eng:{type: Sequelize.STRING},
                                    cost_arb:{type: Sequelize.STRING},
                                    description_eng:{type: Sequelize.STRING},
                                    description_arb:{type: Sequelize.STRING},
                                    time:{type: Sequelize.STRING},
                                    status:{type: Sequelize.STRING},
                                    created_at:{type: Sequelize.STRING},
                                    updated_at:{type: Sequelize.STRING}
                                   
                                },
                                {
                                    tableName:'saloonservices'
                                }
                            )

exports.Employee= sequelize.define('employee',{
                                    saloon_id:{type: Sequelize.STRING},
                                    first_name:{type: Sequelize.STRING},
                                    first_name_arb:{type: Sequelize.STRING},
                                    last_name:{type: Sequelize.STRING},
                                    last_name_arb:{type: Sequelize.STRING},
                                    contact_number:{type: Sequelize.STRING},
                                    email:{type: Sequelize.STRING},
                                    gender:{type: Sequelize.STRING},
                                    services:{type: Sequelize.STRING},
                                    details:{type: Sequelize.STRING},
                                    details_arb:{type: Sequelize.STRING},
                                    employee_image:{type: Sequelize.STRING},
                                    employee_Ids:{type: Sequelize.STRING},
                                    status:{type: Sequelize.STRING},
                                    created_at:{type: Sequelize.STRING},
                                    updated_at:{type: Sequelize.STRING},
                                    password:{type: Sequelize.STRING}

                                   
                                },
                                {
                                    tableName:'employee'
                                }
                            )

exports.EmployeeServices= sequelize.define('employee_services',{
                                    saloon_id:{type: Sequelize.STRING},
                                    employee_id:{type: Sequelize.STRING},
                                    service_id:{type: Sequelize.STRING}
                                   
                                },
                                {
                                    tableName:'employee_services'
                                }
                            )

exports.SaloonCategories= sequelize.define('saloon_categories',{
                                    saloon_id:{type: Sequelize.STRING},
                                    category_id:{type: Sequelize.STRING},
                                    status:{type: Sequelize.STRING}
                                   
                                },
                                {
                                    tableName:'saloon_categories'
                                }
                            )

exports.SaloonImage= sequelize.define('saloon_image',{
                                    saloon_id:{type: Sequelize.STRING},
                                    image:{type: Sequelize.STRING}
                                   
                                },
                                {
                                    tableName:'saloon_image'
                                }
                            )

exports.Appointment= sequelize.define('appointment_by_customer',{
                                    saloon_id:{type: Sequelize.STRING},
                                    emp_id:{type: Sequelize.STRING},
                                    services_id:{type: Sequelize.STRING},
                                    customer_id:{type: Sequelize.STRING},
                                    saloon_id:{type: Sequelize.STRING},
                                    date:{type: Sequelize.STRING},
                                    start_time:{type: Sequelize.STRING},
                                    end_time:{type: Sequelize.STRING},
                                    payment_type:{type: Sequelize.STRING},
                                    coupon_code:{type: Sequelize.STRING},
                                    payment_status:{type: Sequelize.STRING},
                                    amount:{type: Sequelize.STRING},
                                    amount_arb:{type: Sequelize.STRING},
                                    appointment_status:{type: Sequelize.STRING}
                                   
                                },
                                {
                                    tableName:'appointment_by_customer'
                                }
                            )

exports.SaloonRating= sequelize.define('saloon_review',{
                                    saloon_id:{type: Sequelize.STRING},
                                    customer_id:{type: Sequelize.STRING},
                                    review:{type: Sequelize.STRING},
                                    rating:{type: Sequelize.STRING}
                                   
                                },
                                {
                                    tableName:'saloon_review'
                                }
                            )


exports.AboutUs= sequelize.define('about_beauty_services',{
                                    about:{type: Sequelize.STRING},
                                },
                                {
                                    tableName:'about_beauty_services'
                                }
                            )


exports.ContactUs= sequelize.define('contact_us',{
                                    first_name:{type: Sequelize.STRING},
                                    last_name:{type: Sequelize.STRING},
                                    email:{type: Sequelize.STRING},
                                    message:{type: Sequelize.STRING}
                                   
                                },
                                {
                                    tableName:'contact_us'
                                }
                            )

exports.Faq= sequelize.define('FAQ',{
                                    questions:{type: Sequelize.STRING},
                                    answers:{type: Sequelize.STRING}
                                },
                                {
                                    tableName:'FAQ'
                                }
                            )

exports.CouponCodes= sequelize.define('coupon_codes',{
                                    coupon_code:{type: Sequelize.STRING},
                                    discount_percent:{type: Sequelize.STRING},
                                    discount_price:{type: Sequelize.STRING}
                                },
                                {
                                    tableName:'coupon_codes'
                                }
                            )


exports.InvitedUsers= sequelize.define('invited_users',{
                                    customer_id:{type: Sequelize.STRING},
                                    coupon_id:{type: Sequelize.STRING}
                                },
                                {
                                    tableName:'invited_users'
                                }
                            )

