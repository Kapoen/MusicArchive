CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE public.song (
    id SERIAL NOT NULL PRIMARY KEY,
    title text NOT NULL,
    part text NOT NULL,
    date_added date NOT NULL
);

CREATE TABLE public.composer (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name text,
    last_name text
);

CREATE TABLE public.song_to_composer (
    song_id integer NOT NULL,
    composer_id integer NOT NULL
);

CREATE TABLE public.arranger (
     id SERIAL NOT NULL PRIMARY KEY,
     first_name text,
     last_name text
);

CREATE TABLE public.song_to_arranger (
     song_id integer NOT NULL,
     arranger_id integer NOT NULL
);

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
