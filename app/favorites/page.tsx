import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteProperties from '../actions/getFavoriteProperties';
import EmptyState from '../components/EmptyState';
import FavoriteClient from './FavoriteClient';


const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favoriteProperties = await getFavoriteProperties();

  if (favoriteProperties.length === 0) {
    return (
      <EmptyState title='No favorites found' subtitle='Looks like you have no favorite properties' />
    )
  }

  return (
    <FavoriteClient properties={favoriteProperties} currentUser={currentUser} />
  )
}

export default FavoritesPage