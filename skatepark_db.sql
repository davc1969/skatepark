--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: skaters; Type: TABLE; Schema: public; Owner: dario
--

CREATE TABLE public.skaters (
    id integer NOT NULL,
    email character varying(50) NOT NULL,
    nombre character varying(25) NOT NULL,
    password character varying(100) NOT NULL,
    anos_experiencia integer NOT NULL,
    especialidad character varying(50) NOT NULL,
    foto character varying(255) NOT NULL,
    estado boolean NOT NULL
);


ALTER TABLE public.skaters OWNER TO dario;

--
-- Name: skaters_id_seq; Type: SEQUENCE; Schema: public; Owner: dario
--

CREATE SEQUENCE public.skaters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.skaters_id_seq OWNER TO dario;

--
-- Name: skaters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dario
--

ALTER SEQUENCE public.skaters_id_seq OWNED BY public.skaters.id;


--
-- Name: skaters id; Type: DEFAULT; Schema: public; Owner: dario
--

ALTER TABLE ONLY public.skaters ALTER COLUMN id SET DEFAULT nextval('public.skaters_id_seq'::regclass);


--
-- Data for Name: skaters; Type: TABLE DATA; Schema: public; Owner: dario
--

COPY public.skaters (id, email, nombre, password, anos_experiencia, especialidad, foto, estado) FROM stdin;
1	a@sk.cl	Ana	$2b$10$JPz5LQk2eQfTP74JcyWVUe8Rb1Yp0Rzg8GB9SfkHLFuzXvWGeRI6K	4	Ollie	a@sk.cl_08032f3b.jpg	t
2	i@skt.cl	Ingrid Hernandez	$2b$10$AkdREuHgYXM6fWtLzfQ1GeHQtvKyXz3D79MwtGKFsAeHpgA3BEPyG	3	Salto	i@skt.cl_d5b60ca8.jpg	f
\.


--
-- Name: skaters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dario
--

SELECT pg_catalog.setval('public.skaters_id_seq', 2, true);


--
-- Name: skaters skaters_email_key; Type: CONSTRAINT; Schema: public; Owner: dario
--

ALTER TABLE ONLY public.skaters
    ADD CONSTRAINT skaters_email_key UNIQUE (email);


--
-- PostgreSQL database dump complete
--

