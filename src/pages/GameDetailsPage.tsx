import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchGame } from '@/store/reducers/games'
import { Col, Row, Typography } from 'antd'

export function GameDetailsPage() {
  const dispatch = useAppDispatch()
  const { id, slug } = useParams<{ id: string; slug: string }>()
  const { game, gamesList } = useAppSelector((state) => state.games)

  useEffect(() => {
    dispatch(fetchGame(`${id}/${slug}`))
  }, [gamesList])

  return (
    <div>
      <Link to={'/'}>На главную</Link>

      <Row justify={'center'} align={'middle'}>
        <Col>
          <Typography.Title level={2}>{game?.title}</Typography.Title>
        </Col>
      </Row>
    </div>
  )
}
