--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-14 10:55:23 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 220 (class 1259 OID 16400)
-- Name: found_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.found_items (
    id integer NOT NULL,
    item_name text NOT NULL,
    found_date date NOT NULL,
    line text,
    station text,
    remarks text,
    image text,
    user_email text,
    user_name text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.found_items OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16399)
-- Name: found_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.found_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.found_items_id_seq OWNER TO postgres;

--
-- TOC entry 3617 (class 0 OID 0)
-- Dependencies: 219
-- Name: found_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.found_items_id_seq OWNED BY public.found_items.id;


--
-- TOC entry 218 (class 1259 OID 16390)
-- Name: lost_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lost_items (
    id integer NOT NULL,
    item_name text NOT NULL,
    lost_date date NOT NULL,
    line text,
    station text,
    remarks text,
    image text,
    user_email text,
    user_name text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.lost_items OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16389)
-- Name: lost_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lost_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lost_items_id_seq OWNER TO postgres;

--
-- TOC entry 3618 (class 0 OID 0)
-- Dependencies: 217
-- Name: lost_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lost_items_id_seq OWNED BY public.lost_items.id;


--
-- TOC entry 3457 (class 2604 OID 16403)
-- Name: found_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.found_items ALTER COLUMN id SET DEFAULT nextval('public.found_items_id_seq'::regclass);


--
-- TOC entry 3455 (class 2604 OID 16393)
-- Name: lost_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lost_items ALTER COLUMN id SET DEFAULT nextval('public.lost_items_id_seq'::regclass);


--
-- TOC entry 3611 (class 0 OID 16400)
-- Dependencies: 220
-- Data for Name: found_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.found_items (id, item_name, found_date, line, station, remarks, image, user_email, user_name, created_at) FROM stdin;
\.


--
-- TOC entry 3609 (class 0 OID 16390)
-- Dependencies: 218
-- Data for Name: lost_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lost_items (id, item_name, lost_date, line, station, remarks, image, user_email, user_name, created_at) FROM stdin;
\.


--
-- TOC entry 3619 (class 0 OID 0)
-- Dependencies: 219
-- Name: found_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.found_items_id_seq', 1, false);


--
-- TOC entry 3620 (class 0 OID 0)
-- Dependencies: 217
-- Name: lost_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lost_items_id_seq', 1, false);


--
-- TOC entry 3462 (class 2606 OID 16408)
-- Name: found_items found_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.found_items
    ADD CONSTRAINT found_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3460 (class 2606 OID 16398)
-- Name: lost_items lost_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lost_items
    ADD CONSTRAINT lost_items_pkey PRIMARY KEY (id);


-- Completed on 2025-07-14 10:55:24 IST

--
-- PostgreSQL database dump complete
--

