import MyPage from 'components/_ui/page/MyPage'
import NotFound from 'components/notFound/NotFound'

const NotFoundPage = () => {
  return (
    <MyPage metaTitle='Страница не найдена' metaDescr='Страница не найдена'>
        <NotFound title={'Страница не найдена'} subtitle={'Страница по введенному Вами адресу отсутствует. Вернитесь на главную страницу'} goBackNeed={true} />
    </MyPage>
  )
}

export default NotFoundPage