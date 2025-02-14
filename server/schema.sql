CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE public.song (
    id integer NOT NULL,
    title text NOT NULL,
    part text NOT NULL,
    date_added date NOT NULL
);

CREATE TABLE public.composer (
    id integer NOT NULL,
    first_name text,
    last_name text NOT NULL
);

CREATE TABLE public.song_to_composer (
    song_id integer NOT NULL,
    composer_id integer NOT NULL
);

CREATE TABLE public.arranger (
     id integer NOT NULL,
     first_name text,
     last_name text NOT NULL
);

CREATE TABLE public.song_to_arranger (
     song_id integer NOT NULL,
     arranger_id integer NOT NULL
);

ALTER TABLE ONLY public.song
    ADD CONSTRAINT song_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.composer
    ADD CONSTRAINT composer_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.arranger
    ADD CONSTRAINT arranger_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.song_to_composer
    ADD CONSTRAINT song_to_composer_songfkey FOREIGN KEY (song_id)
    REFERENCES public.song (id);

ALTER TABLE ONLY public.song_to_composer
    ADD CONSTRAINT song_to_composer_composerfkey FOREIGN KEY (composer_id)
    REFERENCES public.composer (id);

ALTER TABLE ONLY public.song_to_arranger
    ADD CONSTRAINT song_to_arranger_songfkey FOREIGN KEY (song_id)
    REFERENCES public.song (id);

ALTER TABLE ONLY public.song_to_arranger
    ADD CONSTRAINT song_to_arranger_arrangerfkey FOREIGN KEY (arranger_id)
    REFERENCES public.arranger (id);
