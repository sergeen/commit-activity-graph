# GitHub Commit Activity Graph

## Introduction
This project visualizes the weekly commit activity for the Facebook React repository using data from the GitHub API. The commit activity is displayed in a graph where the color density represents the number of commits per day, divided into four intensity levels based on the highest single day activity.

## Color Density Breakdown
- **Darkest**: 75% - 100% of the highest commits (e.g., 63-84 commits)
- **Darker**: 50% - 74% of the highest commits (e.g., 42-62 commits)
- **Base**: 25% - 49% of the highest commits (e.g., 21-41 commits)
- **Lighter**: 1% - 24% of the highest commits (e.g., 1-20 commits)
- **Lightest (empty)**: 0 commits

## Tech Stack
- **Vite**
- **React**
- **Axios**
- **Context API**

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone git@github.com:sergeen/commit-activity-graph.git
