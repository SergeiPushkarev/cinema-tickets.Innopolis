# cinema-tickets.Innopolis - учебный проект по курсу Frontend - разработки Университета Иннополис. Обучающийся - Пушкарев Сергей
## Установка зависимостей

'''shell
npm install @babel/core @babel/cli @babel/preset-env --save-dev
'''

## Запуск Babel

'''shell
npx babel js -d target
'''

## Автопересборка babel
'''shell
npx babel js -d target --watch
'''

## компиляция с Source Map
'''shell
npx babel js -d target --watch --source-maps
'''