-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

--Database name "paddle"


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "trips" (
    "id" SERIAL PRIMARY KEY,
    "entryDate" DATE,
    "userid" INT REFERENCES "user",
    "entryid" INT REFERENCES "entrypoints",
);

CREATE TABLE "entrypoints" (
    "id" SERIAL PRIMARY KEY,
    "entryNumber" VARCHAR,
    "entryPoint" VARCHAR (80) NOT NULL,
    "latitude" DECIMAL(10, 6),
    "longitude" DECIMAL(10, 6)
);

CREATE TABLE "paddlers" (
    "id" SERIAL PRIMARY KEY,
    "firstName" VARCHAR (1000) NOT NULL,
    "lastName" VARCHAR (1000) NOT NULL,
    "tripid" INT REFERENCES "trips",
);

CREATE TABLE "gearlist" (
    "id" SERIAL PRIMARY KEY,
    "item" VARCHAR (1000) NOT NULL,
    "quantity" INT,
    "gotIt" BOOLEAN NOT NULL,
    "paddlerid" INT REFERENCES "paddlers",
);

CREATE TABLE "meallist" (
    "id" SERIAL PRIMARY KEY,
    "item" VARCHAR (1000) NOT NULL,
    "meal" VARCHAR (100) NOT NULL,
    "quantity" INT,
    "gotIt" BOOLEAN NOT NULL,
    "paddlerid" INT REFERENCES "paddlers",
);

INSERT INTO "entrypoints"
    ("entryNumber", "entryPoint", "latitude", "longitude")
VALUES
    ('1', 'Trout Lake', 47.91438, -92.32196),
    ('4', 'Crab Lake', 47.93367, 92.02692),
    ('6', 'Slim Lake', 47.99582, -91.95993),
    ('7', 'Big Lake', 48.06514, -92.01875),
    ('8', 'Moose River (south)', 48.07200, -92.13123),
    ('9', 'Little Indian Sioux River (south)', 48.14196, -92.20787),
    ('12', 'Little Vermilion Lake', 48.29953, -92.42683),
    ('12a', 'Lac LaCroix', 48.29772, -92.42743),
    ('14', 'Little Indian Sioux River (north)', 48.14664, -92.21028),
    ('16', 'Moose/Portage River (north)', 48.12303, -92.09909),
    ('19', 'Stuart River', 48.09553, -91.98868),
    ('20', 'Angleworm Lake', 48.06588, -91.93028),
    ('22', 'Mudro Lake (restricted)', 48.03540, -91.82868),
    ('23', 'Mudro Lake', 48.03560, -91.83008),
    ('24', 'Fall Lake', 47.95273, -91.72127),
    ('25', 'Moose Lake', 47.98770, -91.49969),
    ('26', 'Wood Lake', 47.96912, -91.60012),
    ('27', 'Snowbank Lake', 47.97155, -91.43265),
    ('28', 'Snowbank Lake Only', 47.97110, -91.43247),
    ('29', 'North Kawishiwi River', 47.95432, -91.56415),
    ('30', 'Lake One', 47.93907, -91.47923),
    ('31', 'Farm Lake', 47.89320, -91.71832),
    ('32', 'South Kawishiwi River', 47.84194, -91.66324),
    ('33', 'Little Gabbro Lake', 47.84809, -91.63571),
    ('34', 'Island River', 47.79123, -91.33323),
    ('35', 'Isabella Lake', 47.80093, -91.30336),
    ('36', 'Hog Creek', 47.81038, -91.08641),
    ('37', 'Kawishiwi Lake', 47.83899, -91.10363),
    ('38', 'Sawbill Lake', 47.86987, -90.88578),
    ('39', 'Baker Lake', 47.84523, -90.81691),
    ('40', 'Homer Lake', 47.90428, -90.66046),
    ('41', 'Brule Lake', 47.92606, -90.64479),
    ('43', 'Bower Trout Lake', 47.94695, -90.44420),
    ('44', 'Ram Lake', 47.95467, -90.44229),
    ('45', 'Morgan Lake', 48.00079, -90.40980),
    ('47', 'Lizz and Swamp Lakes', 48.04204, -90.49976),
    ('48', 'Meeds Lake', 48.04399, -90.53265),
    ('49', 'Skipper and Portage Lakes', 48.05172, -90.53660),
    ('50', 'Cross Bay Lake', 48.07599, -90.82215),
    ('51', 'Missing Link Lake', 48.07305, -90.83010),
    ('52', 'Brant Lake', 48.06924, -90.84553),
    ('54', 'Seagull Lake', 48.14686, -90.86930),
    ('54a', 'Seagull Lake Only', 48.14667, -90.86947),
    ('55', 'Saganaga Lake', 48.17162, -90.88677),
    ('55a', 'Saganaga Lake Only', 48.17132, -90.88649),
    ('57', 'Magnetic Lake', 48.09688, -90.76210),
    ('58', 'South Lake', 48.10169, -90.56861),
    ('60', 'Duncan Lake', 48.07088, -90.45168),
    ('61', 'Daniels Lake', 48.07268, -90.43583),
    ('62', 'Clearwater Lake', 48.07016, -90.37519),
    ('64', 'East Bearskin Lake', 48.04074, -90.38004),
    ('66', 'Crocodile River', 48.03473, -90.27310),
    ('67', 'Bog Lake', 47.77244, -91.38696),
    ('68', 'Pine Lake', 48.05054, -90.05717),
    ('69', 'John Lake', 48.05474, -90.05689),
    ('70', 'North Fowl Lake', 48.05427, -90.05402),
    ('75', 'Little Isabella River', 47.77603, -91.48845),
    ('77', 'South Hegman Lake', 48.03364, -91.92500),
    ('80', 'Larch Creek', 48.12695, -90.83039),
    ('84', 'Snake River', 47.77336, -91.52606),
    ('A', 'Trout Lake', 47.91278, -92.34060),
    ('C', 'Fall Lake Only', 47.95247, -91.72079),
    ('D', 'Fall Lake and Beyond', 47.95244, -91.72174),
    ('F', 'Moose Lake Chain Only', 47.98663, -91.50003),
    ('G', 'Moose Lake to Prairie Portage', 47.98669, -91.49793),
    ('H', 'Snowbank Lake', 47.97219, -91.43287),
    ('I', 'South Farm Lake', 47.89312, -91.71866),
    ('J', 'Saganaga Lake', 48.16881, -90.88687),
    ('K', 'Seagull Lake', 48.14543, -90.86826),
    ('L', 'Clearwater Lake', 48.07138, -90.37451),
    ('M', 'East Bearskin Lake', 48.03990, -90.37811);