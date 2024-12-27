CREATE TABLE public."Categories" (
	"CatID" INT GENERATED ALWAYS AS IDENTITY,
	"CatName" VARCHAR(20)
);

-- ADD CATEGORIES
INSERT INTO public."Categories" ("CatName") VALUES ('Technology');
INSERT INTO public."Categories" ("CatName") VALUES ('Electronics');
INSERT INTO public."Categories" ("CatName") VALUES ('Fitness');
INSERT INTO public."Categories" ("CatName") VALUES ('Beauty');
INSERT INTO public."Categories" ("CatName") VALUES ('Fashion');
INSERT INTO public."Categories" ("CatName") VALUES ('Other');
INSERT INTO public."Categories" ("CatName") VALUES ('Food');
INSERT INTO public."Categories" ("CatName") VALUES ('Health');
INSERT INTO public."Categories" ("CatName") VALUES ('Toys');
INSERT INTO public."Categories" ("CatName") VALUES ('Lifestyle');
INSERT INTO public."Categories" ("CatName") VALUES ('Vehicle');

-- ADD CATEGORY ID TO PRODUCTS
UPDATE public."Products" SET "Category"=1 WHERE "Category"=100013;
UPDATE public."Products" SET "Category"=1 WHERE "Category"=100535;
UPDATE public."Products" SET "Category"=1 WHERE "Category"=100644;
UPDATE public."Products" SET "Category"=1 WHERE "Category"=100635;
UPDATE public."Products" SET "Category"=1 WHERE "Category"=100634;
UPDATE public."Products" SET "Category"=2 WHERE "Category"=100631;
UPDATE public."Products" SET "Category"=2 WHERE "Category"=100010;
UPDATE public."Products" SET "Category"=3 WHERE "Category"=100015;
UPDATE public."Products" SET "Category"=4 WHERE "Category"=100630;
UPDATE public."Products" SET "Category"=5 WHERE "Category"=100016;
UPDATE public."Products" SET "Category"=5 WHERE "Category"=100012;
UPDATE public."Products" SET "Category"=5 WHERE "Category"=100534;
UPDATE public."Products" SET "Category"=5 WHERE "Category"=100532;
UPDATE public."Products" SET "Category"=5 WHERE "Category"=100011;
UPDATE public."Products" SET "Category"=5 WHERE "Category"=100533;
UPDATE public."Products" SET "Category"=5 WHERE "Category"=100633;
UPDATE public."Products" SET "Category"=5 WHERE "Category"=100009;
UPDATE public."Products" SET "Category"=6 WHERE "Category"=100638;
UPDATE public."Products" SET "Category"=7 WHERE "Category"=100629;
UPDATE public."Products" SET "Category"=8 WHERE "Category"=100001;
UPDATE public."Products" SET "Category"=9 WHERE "Category"=100632;
UPDATE public."Products" SET "Category"=9 WHERE "Category"=100639;
UPDATE public."Products" SET "Category"=10 WHERE "Category"=100636;
UPDATE public."Products" SET "Category"=11 WHERE "Category"=100640;
UPDATE public."Products" SET "Category"=11 WHERE "Category"=100641;
UPDATE public."Products" SET "Category"=11 WHERE "Category"=100637;
DELETE FROM public."Products" WHERE "Category"=100017;

SELECT DISTINCT "Category" FROM public."Products"
