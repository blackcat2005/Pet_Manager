CREATE TYPE "serviceStatus" AS ENUM (
  'created',
  'processing',
  'completed',
  'canceled'
);

CREATE TYPE "roomType" AS ENUM (
  'vip',
  'normal'
);

CREATE TYPE "foodTimeType" AS ENUM (
  'breakfast',
  'lunch',
  'dinner'
);

CREATE TYPE "serviceType" AS ENUM (
  'storageService',
  'beautyService',
  'appointment'
);

CREATE TABLE "storageOrders" (
  "order_id" SERIAL PRIMARY KEY NOT NULL,
  "service_id" integer NOT NULL,
  "type" "serviceType" NOT NULL,
  "date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "total" real NOT NULL
);

CREATE TABLE "beautyOrders" (
  "order_id" SERIAL PRIMARY KEY NOT NULL,
  "type" "serviceType" NOT NULL,
  "date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "total" real NOT NULL,
  "service_id" integer NOT NULL
);

CREATE TABLE "appointmentOrders" (
  "order_id" SERIAL PRIMARY KEY NOT NULL,
  "type" "serviceType" NOT NULL,
  "date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "total" real NOT NULL,
  "service_id" integer NOT NULL
);

CREATE TABLE "presciptionsOrders" (
  "order_id" SERIAL PRIMARY KEY NOT NULL,
  "prescription_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "pet_id" integer NOT NULL,
  "type" "serviceType" NOT NULL,
  "date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "total" real NOT NULL
);

CREATE TABLE "resetTokens" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "email" character varying NOT NULL,
  "token" character varying NOT NULL,
  "used" boolean NOT NULL,
  "expiration" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY NOT NULL,
  "username" character varying(50) UNIQUE NOT NULL,
  "email" character varying(100) UNIQUE NOT NULL,
  "password" character varying(200) NOT NULL,
  "fullname" character varying(100) NOT NULL,
  "phone_numbers" character varying(10) NOT NULL,
  "roles" character varying(10)[] DEFAULT '{customer}'::character varying[] NOT NULL,
  "address" character varying(200),
  "city" character varying(100),
  "country" character varying(100),
  "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "pets" (
  "pet_id" SERIAL PRIMARY KEY NOT NULL,
  "fullname" character varying(100) NOT NULL,
  "species" character varying(5) NOT NULL,
  "age" real NOT NULL,
  "weight" real NOT NULL,
  "sex" character varying(100) NOT NULL,
  "health" character varying(100),
  "describe" character varying(200),
  "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "plan_id" integer,
  "medical_record_id" integer,
  "user_id" integer NOT NULL
);

CREATE TABLE "appointments" (
  "service_id" SERIAL PRIMARY KEY NOT NULL,
  "medical_record_id" integer NOT NULL,
  "status" "serviceStatus" NOT NULL,
  "date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "time_slot" integer NOT NULL
);

CREATE TABLE "timeSlots" (
  "time_slot" SERIAL PRIMARY KEY NOT NULL,
  "time" time NOT NULL
);

CREATE TABLE "medicalRecords" (
  "medical_record_id" SERIAL PRIMARY KEY NOT NULL,
  "neutered" bool NOT NULL,
  "symptoms" character varying(200) NOT NULL,
  "diagnostic" character varying(200) NOT NULL,
  "prescription_id" integer NOT NULL,
  "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "prescriptions" (
  "prescription_id" SERIAL PRIMARY KEY NOT NULL,
  "note" character varying(100) NOT NULL,
  "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "prescriptionItem" (
  "prescription_item_id" SERIAL PRIMARY KEY NOT NULL,
  "prescription_id" integer,
  "medicine" character varying(100) NOT NULL,
  "dosage" character varying(100) NOT NULL,
  "note" character varying(100) NOT NULL
);

CREATE TABLE "beautyServices" (
  "service_id" SERIAL PRIMARY KEY NOT NULL,
  "status" "serviceStatus" NOT NULL,
  "date" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "time_slot" integer,
  "note" character varying(100)
);

CREATE TABLE "storageServices" (
  "service_id" SERIAL PRIMARY KEY NOT NULL,
  "status" "serviceStatus" NOT NULL,
  "room_id" integer NOT NULL,
  "date_start" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "date_end" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "note" character varying(100)
);

CREATE TABLE "roomInfo" (
  "room_id" SERIAL PRIMARY KEY NOT NULL,
  "type" "roomType" NOT NULL,
  "number" integer NOT NULL
);

CREATE TABLE "storageRegistations" (
  "service_id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" integer NOT NULL,
  "pet_id" integer NOT NULL
);

CREATE TABLE "beautyRegistations" (
  "service_id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" integer NOT NULL,
  "pet_id" integer NOT NULL
);

CREATE TABLE "appointmentRegistations" (
  "service_id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" integer NOT NULL,
  "pet_id" integer NOT NULL
);

CREATE TABLE "dietPlans" (
  "plan_id" SERIAL PRIMARY KEY NOT NULL,
  "name" character varying(100) NOT NULL,
  "description" character varying(200) NOT NULL,
  "date_start" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "date_end" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "foodItem" (
  "food_id" SERIAL PRIMARY KEY NOT NULL,
  "plan_id" integer NOT NULL,
  "name" character varying(100) NOT NULL,
  "amount" real NOT NULL,
  "unit" character varying(10) NOT NULL,
  "description" character varying(200) NOT NULL,
  "time" "foodTimeType" NOT NULL
);

CREATE TABLE "servicePrice" (
  "service_name" "serviceType" PRIMARY KEY NOT NULL,
  "price" real NOT NULL
);

ALTER TABLE "pets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "pets" ADD FOREIGN KEY ("plan_id") REFERENCES "dietPlans" ("plan_id");

ALTER TABLE "foodItem" ADD FOREIGN KEY ("plan_id") REFERENCES "dietPlans" ("plan_id");

ALTER TABLE "storageOrders" ADD FOREIGN KEY ("service_id") REFERENCES "storageRegistations" ("service_id");

ALTER TABLE "beautyOrders" ADD FOREIGN KEY ("service_id") REFERENCES "beautyRegistations" ("service_id");

ALTER TABLE "appointmentOrders" ADD FOREIGN KEY ("service_id") REFERENCES "appointmentRegistations" ("service_id");

ALTER TABLE "storageRegistations" ADD FOREIGN KEY ("pet_id") REFERENCES "pets" ("pet_id");

ALTER TABLE "beautyRegistations" ADD FOREIGN KEY ("pet_id") REFERENCES "pets" ("pet_id");

ALTER TABLE "appointmentRegistations" ADD FOREIGN KEY ("pet_id") REFERENCES "pets" ("pet_id");

ALTER TABLE "appointmentRegistations" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "beautyRegistations" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "storageRegistations" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "storageRegistations" ADD FOREIGN KEY ("service_id") REFERENCES "storageServices" ("service_id");

ALTER TABLE "beautyRegistations" ADD FOREIGN KEY ("service_id") REFERENCES "beautyServices" ("service_id");

ALTER TABLE "appointmentRegistations" ADD FOREIGN KEY ("service_id") REFERENCES "appointments" ("service_id");

ALTER TABLE "storageServices" ADD FOREIGN KEY ("room_id") REFERENCES "roomInfo" ("room_id");

ALTER TABLE "beautyServices" ADD FOREIGN KEY ("time_slot") REFERENCES "timeSlots" ("time_slot");

ALTER TABLE "appointments" ADD FOREIGN KEY ("time_slot") REFERENCES "timeSlots" ("time_slot");

ALTER TABLE "appointments" ADD FOREIGN KEY ("medical_record_id") REFERENCES "medicalRecords" ("medical_record_id");

ALTER TABLE "medicalRecords" ADD FOREIGN KEY ("prescription_id") REFERENCES "prescriptions" ("prescription_id");

ALTER TABLE "prescriptionItem" ADD FOREIGN KEY ("prescription_id") REFERENCES "prescriptions" ("prescription_id");

ALTER TABLE "presciptionsOrders" ADD FOREIGN KEY ("prescription_id") REFERENCES "prescriptions" ("prescription_id");
