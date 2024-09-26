create database lotus;
use lotus;

create table usuario_gestante
(
id_usuario_gestante int not null auto_increment primary key ,
nome_gestante varchar(80) not null,
sobrenome_gestante varchar(80) not null,
idade_gestante int not null,
peso_gestante float not null,
altura_gestante float not null,
email_gestante varchar(254) not null,
senha_gestante varchar(40)not null,
foto_gestante varchar(300)
);

insert into usuario_gestante (nome_gestante, sobrenome_gestante, idade_gestante, peso_gestante, altura_gestante, email_gestante, senha_gestante, foto_gestante) values

("Perola",  "Silva", 24, 60, 1.60,"pe22@gmail.com",  "pe123", "https://forbes.com.br/wp-content/uploads/2023/12/mulher-lidiane-jones-bumble.jpg"),
("Juli	ana",  "Soares", 28, 70, 1.70,"ju@gmail.com",  "ju123", "https://assets.propmark.com.br/uploads/2022/02/WhatsApp-Image-2022-02-18-at-08.52.06.jpeg"),
("Lucicleide",  "Oliveira", 68.9, 1.65,30,"lucicleide@gmail.com",  "lu123", "https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2018/03/formacao_1600x1200-como-a-presenca-da-mulher-pode-ser-harmonia-no-mundo.jpg"),
("Charlotte",  "Pereira", 22, 75.1, 1.78,"lottie@gmail.com", "lotte123", null),
("Patricia",  "Melo", 21, 69.9, 1.68,"paty@gmail.com", "paty123", null),
("Roberta",  "Azevedo", 25, 71.1, 1.80,"berta@gmail.com", "ro123", "https://upload.wikimedia.org/wikipedia/commons/5/57/Dulce_Maria_Teleton_3.jpg");

create table usuario_doula
(
id_usuario_doula integer auto_increment primary key,
nome_doula varchar(80) not null,
sobrenome_doula varchar(80) not null,
email_doula varchar(254) not null,
senha_doula varchar(30) not null,
cpf_doula bigint (11) not null,
sobremim_doula varchar(254) not null,
foto_doula varchar(500) not null,
tempo_de_atuacao varchar(10) not null
);

insert into usuario_doula(nome_doula, sobrenome_doula, email_doula, senha_doula, cpf_doula, sobremim_doula, foto_doula, tempo_de_atuacao) values
("Patricia", "Silva", "patriciasilva@gmail.com", "pahsilva2", 54637892181, "descrição curta para teste", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.wikipedia.org%2Fwiki%2FPatr%25C3%25ADcia_Abravanel&psig=AOvVaw1ds8CGiEendaUrP4ux31Vz&ust=1727283910060000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMixy5GI3IgDFQAAAAAdAAAAABAX", "5 anos"),
("Miguelina", "Lopes", "miguelinalop@gmail.com", "miguelopes2", 54637892182, "descrição curta para teste", "https://www.google.com/imgres?q=mulheres%20aleatorias&imgurl=https%3A%2F%2Fimages.passeidireto.com%2Fuser_picture%2F2471729%2Fpicture%2Fb363e17e-f6c5-4343-92fa-20ab0da2fa90%2Fpicture.large&imgrefurl=https%3A%2F%2Fwww.passeidireto.com%2Farquivo%2F3998755%2Fdistribuicao-normal&docid=rHvawJdIswFT8M&tbnid=tmw49PiZHlVpVM&vet=12ahUKEwigu8HPityIAxVyupUCHayGMogQM3oECFYQAA..i&w=240&h=240&hcb=2&ved=2ahUKEwigu8HPityIAxVyupUCHayGMogQM3oECFYQAA", "2 anos"),
("Erika", "Abravanel", "erikaabrava@gmail.com", "abravanel2", 54637892183, "descrição curta para teste", "https://www.google.com/imgres?q=mulheres%20aleatorias&imgurl=https%3A%2F%2Fst2.depositphotos.com%2F4994741%2F11321%2Fi%2F450%2Fdepositphotos_113216666-stock-photo-woman-portrait-on-the-street.jpg&imgrefurl=https%3A%2F%2Fdepositphotos.com%2Fbr%2Fphotos%2Fmulher-comum.html&docid=yfEzBQbthHl5YM&tbnid=mwIvEVeOu2JZ_M&vet=12ahUKEwigu8HPityIAxVyupUCHayGMogQM3oECFwQAA..i&w=600&h=400&hcb=2&ved=2ahUKEwigu8HPityIAxVyupUCHayGMogQM3oECFwQAA", "1 anos"),
("Luisa", "Vasconcelos", "luisavasco@gmail.com", "luvasc0", 54637892184, "descrição curta para teste", "https://www.google.com/imgres?q=mjpg%26q%3D60%26w%3D3000%26ixlib%3Drb-4.0.3%wfHwwfHx8MA%253D%253D&imgrefurl=https%3A%2F%2Funsplash.com%2Fpt-br%2Fs%2Ffotografias%2Fmulheres-bonitas&docid=6xhLi_mmgYTZsM&tbnid=Bgz8yuxOq7e8PM&vet=12ahUKEwiTrZ7HjNyIAxUXrpUCHclgM6o4ChAzegQIHBAA..i&w=3000&h=1993&hcb=2&ved=2ahUKEwiTrZ7HjNyIAxUXrpUCHclgM6o4ChAzegQIHBAA", "15 anos"),
("Ane", "costa", "annecosta@gmail.com", "ane0234", 54637892185, "descrição curta para teste", "https://www.google.com/imgres?q=mulheres%20aleatorias&imgurl=https%3A%2F%2Fwww.psicologosberrini.com.br%2Fwp-content%2Fuploads%2Fcomo-lidar-com-os-gatilhos-emocionais.jpg&imgrefurl=https%3A%2F%2Fwww.psicologosberrini.com.br%2Fblog%2Fcomo-lidar-com-os-gatilhos-emocionais%2F&docid=gHMdoA1I0uRDfM&tbnid=oXutl1KzWeUGuM&vet=12ahUKEwiooNfSjNyIAxWIg5UCHTaHB144FBAzegQIKBAA..i&w=630&h=472&hcb=2&ved=2ahUKEwiooNfSjNyIAxWIg5UCHTaHB144FBAzegQIKBAA", "3 anos");



create table conteudos_gestante
(
id_conteudos int not null auto_increment primary key,
foto_capa varchar(300) not null,
titulo_conteudo varchar(50) not null,
data_conteudo date not null,
conteudo longtext not null
);

insert into conteudos_gestante (foto_capa, titulo_conteudo, data_conteudo, conteudo) values
("https://institutoagf.com.br/wp-content/uploads/2022/07/amamenta.jpg", "Desvendando a amamentação", '2023-01-10', "A amamentação é muito importante para o desenvolvimento do bebe"),
("https://centrointegradobella.com.br/wp-content/uploads/2022/04/pilates-na-gravidez-capa.png", "Pilates faz bem?", '2024-07-24', "O pilates ajuda muito na hora do parto"),
("https://lavembebe.com.br/blog/wp-content/uploads/2020/06/alimenta%C3%A7%C3%A3o-na-gravidez.jpg", "O que comer durante a gestação", '2024-04-02', "Uma alimentação saudavel ajuda a manter seu bebe bem");
desc usuario_gestante;



