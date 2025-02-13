CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE public.song (
    id integer NOT NULL,
    title text NOT NULL,
    composer text NOT NULL,
    arranger text,
    part text NOT NULL,
    addDate date NOT NULL
);

ALTER TABLE ONLY public.song
    ADD CONSTRAINT song_pkey PRIMARY KEY (id);