# Socon (Soul Connect) 🕊️

Socon est une application CRM de gestion d'âmes conçue pour aider les organisations à suivre et à gérer les efforts de sensibilisation, les détails des membres et les rapports d'activité. Construit avec une architecture moderne, il permet de transformer des données complexes en une interface de suivi humaine et intuitive.

## 🚀 Vision du Projet

L'objectif de Socon est de centraliser la gestion des équipes et le suivi des membres (référés comme "âmes"). L'application permet de suivre des détails précis comme le quartier, le statut de salut, et de soumettre des rapports hebdomadaires pour mesurer l'impact spirituel et social au sein d'une communauté.

## 🛠️ Stack Technique

Le projet s'appuie sur des technologies performantes pour garantir rapidité et scalabilité :

- **Frontend** : Vue 3 (Composition API).
- Gestion d'état : Pinia pour une synchronisation fluide des données.
- **Routage** : Vue Router.
- **Design** : Tailwind CSS 4 et Lucide Vue Next pour les icônes.
- **Backend** : Supabase pour l'authentification et la base de données en temps réel.
- **Outils de build** : Vite.

## ✨ Fonctionnalités Clés

- **Authentification sécurisée** : Inscription et connexion via Supabase Auth.
- **Gestion d'équipes** : Visualisation et ajout d'équipes avec navigation vers des tableaux de bord spécifiques.
- **Suivi des membres ("Âmes")** : Ajout, modification et consultation des détails des membres (nom, contact, quartier, statut de salut).
- **Rapports hebdomadaires** : Soumission et consultation de rapports détaillés pour chaque membre.
- **Tableau de bord interactif** : Statistiques en temps réel (pourcentages de personnes sauvées) et tables de données dynamiques.
- **Design Responsive** : Interface optimisée pour mobile avec des animations fluides pour les statistiques.

📂 Structure du Répertoire

```text
src/
├── components/      # Composants UI (Accordéons, Sidebar, DataTable...)
├── lib/             # Client Supabase (Configuration et initialisation)
├── plugins/         # Configuration des notifications Toast
├── router/          # Configuration des routes et gardes de navigation
├── store/           # Gestion d'état globale (AuthStore, MemberStore)
└── views/           # Vues principales (Dashboard, Login, Teams...)
```


## ⚙️ Installation

### 1. Cloner le dépôt :

```
git clone [https://github.com/citou000/socon.git](https://github.com/citou000/socon.git)
cd socon
```


### 2. Installer les dépendances :

```
pnpm install
```

### 3. Configurer l'environnement :
Créez un fichier .env à la racine et ajoutez vos identifiants Supabase :

```
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anonyme
```


### 4. Lancer l'application :

pnpm dev


## 📝 Qualité du Code

Le projet utilise ESLint, Oxlint et Prettier pour maintenir un code propre et cohérent.
pnpm lint : Pour vérifier les erreurs de code.
pnpm format : Pour formater automatiquement les fichiers.
© 2025 Socon CRM. Tous droits réservés.